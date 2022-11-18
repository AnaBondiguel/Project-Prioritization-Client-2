import React, {useEffect} from "react";
import { getTickets } from "../services/ticketServices";
import {Box, Container} from "@mui/material";

import MyTicketsHeader from "../components/tickets/MyTicketsHeader.js";
// import { useParams } from "react-router-dom";
// import {customers} from '../_mocks/customers'
import {TicketTable} from '../components/tickets/TicketTable'
import { useGlobalState } from "../utils/StateContext";

export default function MyTickets() {
    // let navigate = useNavigate();
   const { store, dispatch } = useGlobalState();
  // Get the list of tickets
  useEffect(() => {
    // console.log("tickets at top:", tickets)
    // if (!tickets) {
    //   getTickets()
    //     .then((tickets) => {
    //       // console.log("tickets inside:", tickets)
    //       dispatch({ type: "setTickets", data: tickets });
    //     })
    //     .catch((error) => console.log(error));
    //   if (!loggedInUser) {
    //     return;
    //   }
    // ! rewrite
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
