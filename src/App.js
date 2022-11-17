import { React, useEffect, useReducer } from "react";
import ScrollToTop from "./@mui/components/scrolltotop/ScroolToTop";
import StyledChart from "./@mui/components/chart/styles.js";
import ThemeProvider from "./@mui/theme";
import Router from "./routes"

// import Header from "./Header";

import { StateContext } from "./utils/StateContext";
import reducer from "./utils/StateReducer";
import { getTickets } from "./services/ticketServices";
import {
  getTargets,
  getImpacts,
  getConfidences,
  getEfforts,
} from "./services/selectionServices";
//


// const sections = [
//   {
//     title: "My Tickets",
//     url: "/mytickets",
//   },
//   {
//     title: "New Ticket",
//     url: "/newticket",
//   },
//   {
//     title: "Listings",
//     url: "/listings",
//   },
// ];

function App() {
  const initialState = {
    targets: [],
    impacts: [],
    confidences: [],
    efforts: [],
    tickets: null,
    feedbacks: null,
    loggedInUser: localStorage.getItem("user") || null,
    auth: localStorage.getItem("token") || null,
  };
  const [store, dispatch] = useReducer(reducer, initialState);

// todo ------------------------------------------------
//  todo maychage to array 
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"));
    // if (user) {
    //   dispatch({ type: "setLoggedInUser", data: user });
    // }

    getTickets()
      .then((tickets) => dispatch({ type: "setTickets", data: tickets }))
      .catch((error) => console.log(error));

    getTargets()
      .then((targets) => dispatch({ type: "setTargets", data: targets }))
      .catch((error) => console.log(error));

    getImpacts()
      .then((impacts) => dispatch({ type: "setImpacts", data: impacts }))
      .catch((error) => console.log(error));

    getConfidences()
      .then((confidences) =>
        dispatch({ type: "setConfidences", data: confidences })
      )
      .catch((error) => console.log(error));

    getEfforts()
      .then((efforts) => dispatch({ type: "setEfforts", data: efforts }))
      .catch((error) => console.log(error));
  }, []);
//  todo ------------------------------------------
  
return (
  <ThemeProvider>
    <ScrollToTop />
    <StyledChart />
    <StateContext.Provider value={{ store, dispatch }}>
      <Router />   
    </StateContext.Provider>
  </ThemeProvider>
);
}

export default App;
