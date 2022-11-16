import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { login } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/StateContext";

function SignIn(){
    const initialFormState = {
        email: "",
        password: "",
      };
    
      const [formState, setFormState] = useState(initialFormState);
      const { dispatch } = useGlobalState();
      let navigate = useNavigate();

      //setup onchange for email and password
      function handleChange(event) {
        setFormState({
          ...formState,
          [event.target.name]: event.target.value,
        });
      }
      //setup submit button for sign in 
      function handleSubmit(event) {
        event.preventDefault();
    //once user login, we save user detailed information in the store.
        login(formState)
        .then((data) => {
            
            const user = data.user;
            // user: { username, role }
            // const loggedInUser = sessionStorage.getItem('user')
            // ...
            /*
            // TicketForm.jsx
            const Form = (props) => {
                return <form>...</form>
            }

            if (loggedInUser.role === 'manager') {
                return <TicketForm disabledFields={['initiative', 'description']} />
            }

            return <TicketForm disabledFields={['priority']} />
            */
            // ! get user info
            // console.log(user)  

            const token = data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: "setLoggedInUser", data: JSON.stringify(user) });
            dispatch({ type: "setToken", data: token });
            //go to home page
            navigate("/"); 
      })
      .catch((error) => console.log(error));
          }
     
    return (
        <Box sx={{ ml: 70, width: 500, height: 500, backgroundColor: '#85C1E9 '}} >
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    <h1>Sign In</h1>
                    <label>Email:</label><input type="email" name="email" value={formState.email} onChange={handleChange}></input>
                        <br></br> <br></br>
                    <label>Password:</label><input type="password" name="password" value={formState.password} onChange={handleChange}></input>
                        <br></br> <br></br>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me?" />
                        <br></br> <br></br>
                    <Button variant="contained" size="large" onClick={handleSubmit}>Sign in</Button>
                        <br></br> 
                    <Link href="#">Forgot Password?</Link>
                        <br></br> <br></br>
                    <Grid container spacing={1} columns={8}>
                        <Grid item xs={4}>Need an account?</Grid>
                        <Grid item xs={4}>
                            <Link href="/Signup">Sign up</Link>
                        </Grid>
                    </Grid>
                </Typography>
            </Container>
        </Box>
    );
}

export default SignIn;
