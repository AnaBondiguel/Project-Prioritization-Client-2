import { React, useEffect, useReducer } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { StateContext } from "./utils/StateContext";
//  reducer
import reducer from "./utils/StateReducer";
import {
  getImpacts,
  getConfidences,
  getEfforts,
} from "./services/selectionServices";
// @mui
import ScrollToTop from "./@mui/components/scrolltotop/ScroolToTop";
import ThemeProvider from "./@mui/theme";

// -----------------------------------------------------------
// pages and components
import Home from "./pages/Home.jsx";
import TicketForm from "./pages/TicketForm";
import SearchResults from "./components/SearchResults";
import SubmissionSuccess from "./components/SubmissionSuccess";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn.jsx";
import MyTickets from "./pages/MyTickets.jsx";
import SubmittedTickets from "./pages/SubmittedTickets";
import TicketDetails from "./pages/TicketDetails";
import SignUp from "./pages/SignUp.jsx";
import FeedbackForm from "./components/FeedbackForm";
import Page404 from "./pages/Page404.jsx";
// ------------------------------------------------

function App() {
  const initialState = {
    targets: [],
    impacts: [],
    confidences: [],
    efforts: [],
    tickets: null,
    ticket: null,
    feedbacks: null,
    loggedInUser: localStorage.getItem("user") || null,
    auth: localStorage.getItem("token") || null,
    filterTickets: [],
  };
  const [store, dispatch] = useReducer(reducer, initialState);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // ------------------------------------------------------
    // * can get from backend or use array instead
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
  // ---------------------------------

  return (
    <ThemeProvider>
      <ScrollToTop />
      <StateContext.Provider value={{ store, dispatch }}>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/signin"></Navigate>}
          >
            <Route
              element={
                user && user.role === "manager" ? (
                  <Navigate to="/listings" />
                ) : (
                  <Navigate to="/mytickets" />
                )
              }
              index={true}
            />

            <Route path="mytickets" element={<MyTickets />} />
            <Route path="blog" element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="listings" element={<SubmittedTickets />} />
            <Route path="newticket" element={<TicketForm />} />
            <Route path="mytickets/update/:_id" element={<TicketForm />} />
            <Route path="searchresults" element={<SearchResults />} />
            <Route path="submissionsuccess" element={<SubmissionSuccess />} />
            <Route path="mytickets/:_id" element={<TicketDetails />}>
              <Route path="feedback" element={<FeedbackForm />} />
            </Route>
          </Route>
          <Route
            path="signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="signin"
            element={!user ? <SignIn /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </StateContext.Provider>
    </ThemeProvider>
  );
}

export default App;
