import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useGlobalState } from "../utils/StateContext";
import {  getAllTickets } from "../services/ticketServices";
import TicketTable from "./TicketTable";



function Listings(){
   
    const { store, dispatch } = useGlobalState();
    const { tickets, loggedInUser } = store;
  

// Get the list of tickets
    useEffect(() => {
      // if (!loggedInUser) {
      //   return;
      // }

      // console.log("tickets at top:", tickets)
      if(!tickets){
        getAllTickets() 
        .then(tickets => {
          console.log("ticket listing", tickets)
          // console.log("tickets inside:", tickets)
          dispatch ({type: "setTickets", data: tickets})
        })
        .catch((error) => console.log(error));
      }
    }, [dispatch, tickets, loggedInUser])
  
    if(!tickets) return "null";

    return (
      //if users log in their account, they can see their tickets, otherwise, please sign in. 
        <div>
          {loggedInUser ? (
              <>
              <Typography variant="h4" align="left">All Submitted Tickets</Typography>
              
             <TicketTable
             tickets={tickets}
             />
             
              </>
            ) : (
              <>
                <Typography>Please sign in.</Typography>
              </>
           )}
       
        </div>
    );
}

export default Listings;