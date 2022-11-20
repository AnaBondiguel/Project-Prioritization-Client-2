import React, { useEffect } from "react";
import { getTickets } from "../services/ticketServices";
import { Box, Container } from "@mui/material";
// components
import MyTicketsHeader from "../components/tickets/MyTicketsHeader.js";
import { TicketTable } from "../components/tickets/TicketTable";
import { useGlobalState } from "../utils/StateContext";

export default function MyTickets() {
  const { store, dispatch } = useGlobalState();
  useEffect(() => {
    // use async  function to get all tikets form the users
    const fetchMyTickets = async () => {
      const result = await getTickets();
      dispatch({ type: "setTickets", data: result });
    };

    fetchMyTickets();
  }, [dispatch]);

  const { tickets } = store;

  return (
    <>
      <Container>
        <MyTicketsHeader />
        <Box sx={{ height: 400, width: "100%" }}>
          <TicketTable tickets={tickets} />
        </Box>
      </Container>
    </>
  );
}
