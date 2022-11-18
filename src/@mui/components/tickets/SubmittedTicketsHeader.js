import { Stack, Typography } from "@mui/material";
import React from "react";


export default function SubmittedTicketsHeader() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
      mt={5}
    >
      <Typography variant="h4" gutterBottom>
        Submitted Tickets
      </Typography>

    </Stack>
  );
}