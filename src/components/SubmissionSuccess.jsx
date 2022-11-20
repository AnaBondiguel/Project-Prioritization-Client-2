import React from "react";
import { Link } from "react-router-dom";
import { Typography, Container, Box } from "@mui/material";

// this is submitted successfully page 
function SubmissionSuccess() {
  return (
    <div>
      <Link to="/mytickets">Go back to My Ticket</Link>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#ffffff" }}>
          <Typography variant="h4" align="center">
            ✅
          </Typography>
          <Typography variant="h4" align="center">
            Thank You!
          </Typography>
          <Typography variant="h5" align="center">
            Your ticket has been submitted successfully!
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default SubmissionSuccess;
