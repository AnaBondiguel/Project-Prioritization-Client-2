import { useState } from "react";
import { register } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../utils/StateContext";

// @mui
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
// ------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SignupForm() {
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      let user = data.newUser;
      let token = data.token;
      console.log(data)
      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user)); 

      // todo: check if this is needed
      dispatch({ type: "setLoggedInUser", data: JSON.stringify(user) });
      dispatch({ type: "setToken", data: token });
      navigate("/");
    });
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="firstName"
          label="First Name"
          onChange={handleChange}
        />
        <TextField name="lastName" label="Last Name" onChange={handleChange} />
        <TextField name="email" label="Email address" onChange={handleChange} />

        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={handleChange}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      ></Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
      >
        Sign Up
      </LoadingButton>
    </>
  );
}
