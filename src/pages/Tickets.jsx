import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../@mui/components/tickets/customer-list-results";
import { CustomerListToolbar } from "../@mui/components/tickets/MyTicketsHeader";
import { customers } from "../_mocks/customers";
import React from "react";

export default function Tickets() {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
