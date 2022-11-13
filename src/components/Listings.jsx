import React, { useEffect } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useGlobalState } from "../utils/StateContext";
import { getTickets } from "../services/ticketServices";
import DeleteIcon from '@mui/icons-material/Delete';
// import { handleDelete } from "./TicketDetails";



function Listings(){
   
    const { store, dispatch } = useGlobalState();
    const { tickets, loggedInUser } = store;
  

// Get the list of tickets
    useEffect(() => {
      if (!loggedInUser) {
        return;
      }

      // console.log("tickets at top:", tickets)
      if(!tickets){
        getTickets() 
        .then(tickets => {
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
              
              <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Priority</TableCell>
            <TableCell align="left">Initiative</TableCell>
            <TableCell align="left">Target</TableCell>
            <TableCell align="left">ICE Score</TableCell>
          </TableRow>
        </TableHead>
            
        <TableBody>
              {tickets.map((ticket, index) => {
                return (
                    <TableRow
                    key={ticket.initialtive}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                        <TableCell align="left">{ticket.priority} </TableCell>

                    <Link key={ticket.id} to={`/mytickets/${ticket.id}`}>
                        <TableCell align="right">{ticket.initialtive} </TableCell>
                    </Link>

                        <TableCell align="left">{ticket.target} </TableCell>
                        <TableCell align="left"> {ticket.ICE_Score}</TableCell>
                    
                    </TableRow>
                );
                }
                )}
        </TableBody>
      </Table>
    </TableContainer> 
             
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