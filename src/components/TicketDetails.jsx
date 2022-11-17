import { useEffect, useState } from "react";
import { Box, Button, Typography, Paper, Grid } from "@mui/material";
import {
  useNavigate,
  useParams,
  useLocation,
  Link,
  Outlet
} from "react-router-dom";
import {
  deleteTicket,
  getTicket,
  updateTicket,
} from "../services/ticketServices";
import Feedbacks from "./Feedbacks";
import { useGlobalState } from "../utils/StateContext";

import dateFormat from "dateformat";
import iceScoreCalculation from "./ICE_Score";

const TicketDetails = () => {
  // const [ticket, setTicket] = useState(null);
  let navigate = useNavigate();
  const { _id } = useParams();
  const { store, dispatch } = useGlobalState();
  // const {loggedInUser} = store;
  const location = useLocation();
  const ticket = JSON.parse(location.state.ticket);

  //  !test to get user role
  const { loggedInUser } = store;
  const user = JSON.parse(loggedInUser);

  //setup onClick for delete button
  function handleDelete() {
    deleteTicket(_id).then(() => {
      dispatch({ type: "deleteTicket", data: _id });
      navigate("/mytickets");
    });
  }
  //when the page is loaded, we can fetch the ticket by its given id. If id is changed, we can fetch the ticket.
  // useEffect(() => {
  //   // console.log(ticket)
  //   getTicket(_id)
  //     .then((ticket) => setTicket(ticket))
  //     .catch((error) => console.log(error));
  // }, [_id, loggedInUser]);

  // console.log(_id)
  // console.log(ticket);

  if (!ticket || !user) return null;

  return (
    <div>
      <Paper elevation={3}>
        <h1>Ticket Details</h1>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <h3>{ticket.initialtive}</h3>
            <p>Description: {ticket.description}</p>
            <p>Target: {ticket.target}</p>
            <p>Due Date: {dateFormat(ticket.dueDate, "ddd, mmm dS, yyyy")}</p>
            <p>Author: {ticket.author.email}</p>

            {/* test get submitted conditions */}
            <p>
              isSubmitted:{" "}
              {ticket.isSubmitted ? <p> Yes </p> : <p> Not submitted </p>}
            </p>
          </Grid>
          <Grid item xs={8}>
            <p>Impact: {ticket.impact}</p>
            <p>Confidence: {ticket.confidence}</p>
            <p>Effort: {ticket.effort}</p>
            <p>
              ICE Score:
              {iceScoreCalculation(
                ticket.impact,
                ticket.confidence,
                ticket.effort
              )}
            </p>
            <p>Priority: {ticket.priorityValue}</p>
          </Grid>
        </Grid>

        <Box>
          <Button
            // onClick={() => {
            //   navigate(`/mytickets/update/${_id}`);
            // }}
            component={Link}
            to={`/mytickets/update/${_id}`}
            state={{
              ticket: JSON.stringify(ticket),
            }}
          >
            Edit
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </Box>
      </Paper>
      <hr />

      {user.role === "manager" ? (
        <>
          <Paper>
            <Feedbacks  ticket={ticket}/>
            </Paper>
            <hr/>
          <Paper>
            <Button
              component={Link}
              to="feedback"
              state={{
                ticket: JSON.stringify(ticket),
              }}
            >
              Add Feedback
            </Button>

            <Outlet />
          </Paper>
        </>
      ) : (
        <Paper>
          No feedback because current user role is {user.role}
          <p>{user.email}</p>
        </Paper>
      )}
    </div>
  );
};

export default TicketDetails;