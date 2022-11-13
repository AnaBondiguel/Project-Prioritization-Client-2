import React, { useEffect } from "react";
import { Typography, List, ListItem, Avatar, Button } from "@mui/material";
import { deepPurple } from '@mui/material/colors';
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/StateContext";
import { getTickets } from "../services/ticketServices";

function MyTickets(){
    let navigate = useNavigate();
    const { tickets, loggedInUser, dispatch } = useGlobalState();
    // const { tickets, loggedInUser } = store;
    const [dense] = React.useState(false);

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
              <Typography variant="h4" align="left">My Tickets</Typography>
              <List dense={dense}>
            
                  
               
              {tickets.map((ticket, index) => {
                return (
                 
                //when we click the link, it will direct us to ticket detail page 
                <ListItem>
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>{ticket.priority}</Avatar>

                    <Link key={ticket.id} to={`/mytickets/${ticket.id}`}>
                      <Typography>
                        Initative: {ticket.initiative} & 
                        ICE Score: {ticket.ICE_Score}
                      </Typography>
                    </Link> 
               
              
         
                    </ListItem>
                );
                })}
              
                </List>

                <Button variant="outlined" onClick={() => navigate("/newticket")}>Add Ticket</Button>
              </>
            ) : (
              <>
                <Typography>Please sign in.</Typography>
              </>
           )}
       
        </div>
    );
}

export default MyTickets;


    

