import { Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import React from "react";

export default function MyTicketsHeader() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
      mt={5}
    >
      <Typography variant="h4" gutterBottom>
        My Tickets
      </Typography>

      <Button
        component={Link}
        to="/newticket"
        color="primary"
        variant="contained"
      >
        Add Ticket
      </Button>
    </Stack>
  );
}
