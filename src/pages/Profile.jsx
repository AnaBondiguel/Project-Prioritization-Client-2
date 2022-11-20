import { Box, Container, Grid, Typography } from "@mui/material";
//  component page
import { ProfileDetails } from "../components/userpage/ProfileDetails";

import React from "react";

export default function Profile() {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails />
          </Grid>
        </Container>
      </Box>
    </>
  );
}
