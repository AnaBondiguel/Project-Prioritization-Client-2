import { React, useEffect, useReducer, useState } from "react";
import MyTickets from "./MyTickets";
import TicketForm from "./TicketForm";
import TicketDetails from "./TicketDetails";
import Listings from "./Listings";
import SearchResults from "./SearchResults";
import SubmissionSuccess from "./SubmissionSuccess";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import FeedbackForm from "./FeedbackForm";
// import Container from "@mui/material/Container";
// import NavBar from "./NavBar";
import { Routes, Route, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
// import Header from "./Header";
import Header from '../@mui/header/Header'
import Nav from '../@mui/navbar/Navbar'
import { StateContext } from "../utils/StateContext";
import reducer from "../utils/StateReducer";
import { getTickets } from "../services/ticketServices";
import {
  getTargets,
  getImpacts,
  getConfidences,
  getEfforts,
} from "../services/selectionServices";
// 
import ThemeProvider  from '../@mui/theme'

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
// ----------------------------------------------------------------
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
// ------------------------------------------------------------------

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
  const { loggedInUser } = store;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"));
    // if (user) {
    //   dispatch({ type: "setLoggedInUser", data: user });
    // }
    if (!loggedInUser) {
      return;
    }

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
  }, [loggedInUser]);

  return (
    <ThemeProvider>
      <StateContext.Provider value={{ store, dispatch }}>
        <StyledRoot>
          
          <Header onOpenNav={() => setOpen(true)} />
          <Nav openNav={open} onCloseNav={() => setOpen(false)} />
          {/* <Container maxWidth="lg">
            <NavBar title="Project Priorization" sections={sections}></NavBar>
          </Container> */}
          <Main>
          
       

          <Routes>
            <Route path="/" element={<MyTickets />} />
            <Route path="mytickets" element={<MyTickets />} />
            <Route path="newticket" element={<TicketForm />} />
            {/* { store.user.role === 'manager' ? <Route path="editticket" element={<NewTicket enableInitiative={false} /> : 
          <Route path="editticket" element={<NewTicket />} */}
            {/* <Route path="editticket" element={<NewTicket enableInitiative={false} />} /> */}
            <Route path="mytickets/update/:id" element={<TicketForm />} />
            <Route path="listings" element={<Listings />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="searchresults" element={<SearchResults />} />
            <Route path="submissionsuccess" element={<SubmissionSuccess />} />
            <Route path="mytickets/:_id" element={<TicketDetails />}>
              <Route path="feedback" element={<FeedbackForm />} />
            </Route>

            {/* <Route path="mytickets/update/:id" element={<EditTicket  />} /> */}

            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
          </Main>
         </StyledRoot>
      </StateContext.Provider>
    </ThemeProvider>
  );
}

export default App;
