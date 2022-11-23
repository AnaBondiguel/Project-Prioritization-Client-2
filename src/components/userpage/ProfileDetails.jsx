import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../services/authServices";
import { useGlobalState } from "../../utils/StateContext";
// @mui
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Alert,
} from "@mui/material";
// -------------------------------

export const ProfileDetails = () => {
  //  get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { dispatch } = useGlobalState();
  const [error, setError] = useState([]); // set error value
  const [values, setValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  //handle user entering inputs to their first name, last name, and email address.
  const handleChange = (event) => {
    setError([]);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  //handle "save details" button to update user profile information. 
  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser({ id: user._id, ...values })
      .then(() => {
        dispatch({ type: "updateUser", data: { id: user._id, ...values } });
        navigate("/");
      })
      .catch(
        (error) =>
          setError(error.response.data.errors || error.response.data.error) // ! error will be string or array need to be seted
      );
  };

  return (
    <form autoComplete="off">
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />

        {
          // -----------------------------------
          //check error type and condition
          error && typeof error === "string" ? (
            <Alert variant="outlined" severity="error" sx={{ m: 1 }}>
              {error}
            </Alert>
          ) : error ? (
            error.map((err, i) => (
              <Alert key={i} variant="outlined" severity="error" sx={{ m: 1 }}>
                {err.msg}
              </Alert>
            ))
          ) : (
            <></>
          )
          //-------------------------------------
        }
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
