import { Stack, Typography } from "@mui/material";
import React from "react";

export default function EditOrNewTicketHeader(data) {
  //  console.log(data);
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
 