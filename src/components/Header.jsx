import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { useGlobalState } from "../utils/StateContext";
import { logout } from "../services/authServices";



const Header = () => {
    let initialData = {
        userInput: "",
      };
    
      const [data, setData] = useState(initialData);

      let navigate = useNavigate();
      
      // const { dispatch } = useGlobalState();
      // !! no need loggedInUser
      // const {loggedInUser} = store;


      // ! set sessionStorage no need loggInUser so need to optimize 
      const user = JSON.parse(sessionStorage.getItem("user"));
      // console.log(user);
      
    //setup a function to handle logout. We set login user in the token back to null when they log out.
    // ! need to optimize this function
      function handleLogout(event) {
        event.preventDefault();
        logout()
        // ! using sessionStorage no need global dispatch
        // .then(() => {
        //     dispatch({type: "setLoggedInUser", data: null});
        //     dispatch({type: "setToken", data: null});
        // })
      }

      //setup OnChange for search bar 
      function handleOnChange(event) {
        setData({
          ...data,
          userInput: event.target.value,
        });
      }

    //fetch ticket from http://localhost:3000/listings
      // useEffect(
      //   () => {
      //     function fetchTickets() {
      //       const url = "http://localhost:3000/listings"; 
      //       fetch(url)
      //         .then((result) => {
      //           return result.json();
      //         })
      //         .then((data) => {
      //           const tickets = data // array
      //             .map((ticket) => ({
      //               initiative: ticket.initiative,
      //               description: ticket.description,
      //               target: ticket.target,
      //               ICEScore: ticket.ICEScore,
      //             }));
      //           setData({
      //             ...data,
      //             tickets: tickets,
      //           });
      //         })
      //         .catch((error) => {
      //           console.log("Error!", error);
      //         })
      //         .finally(() => {
      //           console.log("Fetch completed.");
      //         });
      //     }
    
      //     fetchTickets();
      //   },
      //   // only run on component did mount
      //   []
      // );

    return (
      <header>
        <Grid container spacing={3}>
          <Grid item xs>
            {/* <img src="" width="50" height="50" alt="logo"/> */}
          </Grid>
          <Grid item xs={6}>
            <label>Search: </label>
            <input type="text" onChange={handleOnChange}></input>
          </Grid>
          <Grid item xs>
            {/* change from logginUser to user */}
            {user ? (
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
