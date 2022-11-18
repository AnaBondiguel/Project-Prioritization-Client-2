import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  Button,
  Card,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import {
  useNavigate,
  useLocation,
  useParams,
  Link,
  Outlet,
} from "react-router-dom";
import TicketDetailsHeader from "../components/tickets/TicketDetailsHeader";
import { useGlobalState } from "../utils/StateContext";
import { deleteTicket } from "../services/ticketServices";
import Feedbacks from "../components/Feedbacks";
import dateFormat from "dateformat";
import iceScoreCalculation from "../components/ICE_Score";

export default function TikcetDetails() {
  let navigate = useNavigate();
  const { _id } = useParams();
  const { store, dispatch } = useGlobalState();

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

  if (!ticket || !user) return null;
  let box = "none";
  if (
    (user.id === ticket.author.id && !ticket.isSubmitted) ||
    user.role === "manager"
  ) {
    box = "";
  }
  let delButton = false;
  if (
    ticket.isSubmitted &&
    user.role === "manager" &&
    user.id === ticket.author.id
  ) {
    delButton = true;
  } else {
    delButton = false;
  }
  // console.log(delButton);
  return (
    <Container  className="main-content-container px-4 pb-4">
      <TicketDetailsHeader />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <Card sx={{ p: 5 }}>
            <Typography variant="h4" sx={{ color: "text.primary" }} noWrap>
              {`${ticket.initialtive}` + "          "}
              {ticket.isSubmitted ? (
                <Chip
                  label="Submitted"
                  color="success"
                  size="small"
                  variant="outlined"
                />
              ) : (
                <Chip
                  label="Not Submit"
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              )}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary" }}
              noWrap
            >
              {`${ticket.author.firstName}` + " " + `${ticket.author.lastName}`}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "info.main" }} noWrap>
              Launch Date: {dateFormat(ticket.dueDate, "ddd, mmm dS, yyyy")}
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: "text.primary" }}
              noWrap
              mt={3}
            >
              Description:
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary" }}
              paragraph={true}
            >
              {ticket.description}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ p: 4, pb: 3 }}>
            <Typography variant="subtitle1" noWrap>
              Target:
              <Chip
                label={`${ticket.target}`}
                color="primary"
                variant="outlined"
                size="small"
              />
            </Typography>
            <Typography variant="subtitle1" mt={2} noWrap>
              Impact: {ticket.impact}
            </Typography>
            <Typography variant="subtitle1" mt={2} noWrap>
              Confidence: {ticket.confidence}
            </Typography>
            <Typography variant="subtitle1" mt={2} noWrap>
              Effort: {ticket.effort}
            </Typography>
            <Typography variant="subtitle1" mt={2} color="primary.main" noWrap>
              ICE Score:
              {iceScoreCalculation(
                ticket.impact,
                ticket.confidence,
                ticket.effort
              )}
            </Typography>
            <p></p>
          </Card>

          <Stack direction="row" mt={2} spacing={2} display={box}>
            <Button
              variant="contained"
              color="success"
              component={Link}
              to={`/mytickets/update/${_id}`}
              state={{
                ticket: JSON.stringify(ticket),
              }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              disabled={delButton}
            >
              Delete
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* {user.role === "manager" ? (
        <>
          <Paper>
            <Feedbacks ticket={ticket} />
          </Paper>
          <hr />
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
      )} */}
    </Container>
  );
}
