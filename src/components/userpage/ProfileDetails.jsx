import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { updateUser } from "../../services/authServices";
import { useGlobalState } from "../../utils/StateContext";

export const ProfileDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { dispatch } = useGlobalState();
  const [values, setValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser({ id: user._id, ...values }).then(() => {
      dispatch({ type: "updateUser", data: { id: user._id, ...values } });
    });
    navigate("/");
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
