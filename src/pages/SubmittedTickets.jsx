import React, { useEffect } from "react";
import { useGlobalState } from "../utils/StateContext";
// hooks
import { getAllTickets } from "../services/ticketServices";
//  @mui
import { Box, Container } from "@mui/material";
// componetns header of listing page, and ticket table from ticketTable component
import SubmittedTicketsHeader from "../components/tickets/SubmittedTicketsHeader";
import { TicketTable } from "../components/tickets/TicketTable";

export default function SubmittedTickets() {
  const { store, dispatch } = useGlobalState();
  const { tickets, loggedInUser } = store;

  useEffect(() => {
    // get all submiited tikets as listings
    const fetchSubmittedTickets = async () => {
      const result = await getAllTickets();
      dispatch({ type: "setTickets", data: result });
    };

    if (loggedInUser) {
      fetchSubmittedTickets();
    }
  }, [dispatch, loggedInUser]);

  if (!tickets) return;

  return (
    <>
      <Container>
        <SubmittedTicketsHeader />
        <Box sx={{ height: 400, width: "100%" }}>
          <TicketTable tickets={tickets} />
        </Box>
      </Container>
    </>
  );
}
