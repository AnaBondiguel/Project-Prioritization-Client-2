import React, { useEffect } from "react";
import { getAllTickets } from "../services/ticketServices";
import { Box, Container } from "@mui/material";

import SubmittedTicketsHeader from "../@mui/components/tickets/SubmittedTicketsHeader";
// import { useParams } from "react-router-dom";
// import {customers} from '../_mocks/customers'
import { TicketTable } from "../@mui/components/tickets/TicketTable";
import { useGlobalState } from "../utils/StateContext";

export default function SubmittedTickets() {
  const { store, dispatch } = useGlobalState();
  const { tickets, loggedInUser } = store;

  // Get the list of tickets
  useEffect(() => {
    // if (!loggedInUser) {
    //   return;
    // }

    // // console.log("tickets at top:", tickets)
    //   getAllTickets()
    //   .then(tickets => {
    //     // console.log("tickets inside:", tickets)
    //     dispatch ({type: "setTickets", data: tickets})
    //   })
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
