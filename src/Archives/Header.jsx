import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/StateContext";
import { logout } from "../services/authServices";
import { getAllTickets } from "../services/ticketServices";

const Header = () => {
    let initialData = {
        userInput: "",
      };
    
      const [data, setData] = useState(initialData);
      let navigate = useNavigate();
      const {store, dispatch} = useGlobalState();
      const {loggedInUser} = store;
      const user = JSON.parse(loggedInUser);


    //setup a function to handle logout. We set login user in the token back to null when they log out.
      function handleLogout(event) {
        event.preventDefault();
        logout().then(() => {
            dispatch({type: "setLoggedInUser", data: null});
            dispatch({type: "setToken", data: null});
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
        })
      }

      //setup OnChange for search bar 
      function handleOnChange(event) {
        setData({
          ...data,
          userInput: event.target.value,
        });
      }

      //setup onKeyUp to search for all the submitted tickets
      function handleSubmit(event){
        if (event.key === "Enter") {
        const filteredTickets = getFilteredTickets()
        console.log("filterticket", filteredTickets)
        dispatch({type: "setFilteredTickets", data: filteredTickets})
        //Once we found the tickets, we'll see the tickets on the search results page
        navigate('/searchresults');
        }
      }

      //set up a function to filter the tickets. If the ticket initiative, target, and ICE_Score are included in the user input, it will return the ticket.
      function getFilteredTickets() {
        if(!data.userInput) {
            return data.tickets;
        }
        let filteredTickets = data.tickets.filter((ticket) => {
        if(ticket.initialtive.includes(data.userInput) || ticket.target.includes(data.userInput)) 
            return ticket
        });
        return filteredTickets;
      }

    //fetch ticket from all the submitted listing tickets
      useEffect(
        () => {
          function fetchTickets() {
           getAllTickets()
              .then((tickets) => {
                console.log("insearch", tickets)
                setData({
                  ...data,
                  tickets: tickets,
                });
              })
              .catch((error) => {
                console.log("Error!", error);
              })
              .finally(() => {
                console.log("Fetch completed.");
              });
          }
          fetchTickets();
        },
        // only run on component did mount
        []
      );

    return (
      <header>
        <Grid container spacing={3}>
          <Grid item xs>
            {/* <img src="" width="50" height="50" alt="logo"/> */}
          </Grid>
          <Grid item xs={6}>
            <label>Search: </label>
            <input type="text" onChange={handleOnChange} onKeyUp={handleSubmit}></input>
          </Grid>
          <Grid item xs>
            {loggedInUser ? (
              <>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography m={2}>Hello, {user.email}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" onClick={handleLogout}>
                      Logout
                    </Button>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/signin")}
                    >
                      Sign in
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/signup")}
                    >
                      Sign up
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </header>
    );
}

export default Header;
