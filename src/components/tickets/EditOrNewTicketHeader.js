import { Stack, Typography } from "@mui/material";
import React from "react";

// ----------------------------------------------------------------
// data is condition to detain is to a newticket page or update exist page
export default function EditOrNewTicketHeader(data) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
      mt={5}
    >
      {data.id ? <Typography variant="h4" gutterBottom>
        Edit Tickets
      </Typography> :  <Typography variant="h4" gutterBottom>
        New Tickets
      </Typography>}   
    </Stack>
  );
}
 