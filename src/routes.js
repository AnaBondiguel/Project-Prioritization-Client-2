// ----------------------------------------------------------
// ! useNavigation can not use in useRoutes situation change back to Routes
// ! useRoutes are more clear
// -----------------------------------------------------------


// import { Navigate, useRoutes } from "react-router-dom";
// // pages
// import Home from "./pages/Home.jsx";
// import MyTickets from "./components/MyTickets";
// import TicketForm from "./components/TicketForm";
// import TicketDetails from "./components/TicketDetails";
// import Listings from "./components/Listings";
// import SearchResults from "./components/SearchResults";
// import SubmissionSuccess from "./components/SubmissionSuccess";
// import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";
// import FeedbackForm from "./components/FeedbackForm";
// import Page404 from "./pages/Page404.jsx";

// const user = JSON.parse(localStorage.getItem("user"));

// export default function Router() {
//   const routes = useRoutes([
//     {
//       path: "/",
//       element: user ? <Home /> : <Navigate to="/signin" />,
//       children: [
//         {
//           element:
//             user && user.role === "manager" ? (
//               <Navigate to="/listings" />
//             ) : (
//               <Navigate to="/mytickets" />
//             ),
//           index: true,
//         },
//         { path: "mytickets", element: <MyTickets /> },
//         { path: "newticket", element: <TicketForm /> },
//         { path: "mytickets/update/:_id", element: <TicketForm /> },
//         { path: "listings", element: <Listings /> },
//         { path: "searchreults", element: <SearchResults /> },
//         { path: "submissionsuccess", element: <SubmissionSuccess /> },
//         {
//           path: "mytickets/:_id",
//           element: <TicketDetails />,
//           children: [{ path: "feedback", element: <FeedbackForm /> }],
//         },
//       ],
//     },
//     // { path: "signin", element: <SignIn /> },
//     { path: "signup", element: <SignUp /> },
//     { path: "*", element: <Page404 /> },
//   ]);

//   return routes;
// }
