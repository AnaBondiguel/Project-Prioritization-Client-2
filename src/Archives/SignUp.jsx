import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography, Grid, Link } from "@mui/material";
import { register } from "../services/authServices";
import { useGlobalState } from "../utils/StateContext";

function SignUp() {
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const [formState, setFormState] = useState(initialFormState);
  const { dispatch } = useGlobalState();
  let navigate = useNavigate();

  //setup onchange for firstname, lastname, email, password
  function handleChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  //setup submit button for sign up
  function handleSubmit(event) {
    event.preventDefault();
    register(formState).then((data) => {
      let user = data.user;
      let token = data.token;
      //   console.log("registered", data);
      // set token in session storage later
      sessionStorage.setItem("token", token);
      // user = { username: '...', email: './..'}
      // user = '{ username: "", email: "" ... }'
      // sessionStorage.setItem("value", 5) // '5' Number(sessionStorage.getItem('value'))
      sessionStorage.setItem("user", JSON.stringify(user)); //sessionstorage allows string 
      // sessionStorage.getItem("user") // returns string
      // then we need to parse the string
      // user = JSON.parse(sessionStorage.getItem('user'))
      // todo: check if this is needed
      dispatch({ type: "setLoggedInUser", data: user });
      dispatch({ type: "setToken", data: token });
      navigate("/");
    });
  }

  return (
    <Box sx={{ ml: 70, width: 550, height: 550, backgroundColor: "#85C1E9 " }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          <h1>Sign Up</h1>
          <label>First Name:</label>
          <input
            type="name"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
          ></input>
          <br></br> <br></br>
          <label>Last Name:</label>
          <input
            type="name"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
          ></input>
          <br></br> <br></br>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          ></input>
          <br></br> <br></br>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
          ></input>
          <br></br> <br></br>
          <label>Comfirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
          ></input>
          <br></br> <br></br>
          <Button variant="contained" onClick={handleSubmit}>
            Sign up
          </Button>
          <br></br> <br></br>
          <Grid container spacing={1} columns={8}>
            <Grid item xs={4}>
              Already a user?
            </Grid>
            <Grid item xs={4}>
              <Link href="/signin">Sign in</Link>
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </Box>
  );
}

export default SignUp;
