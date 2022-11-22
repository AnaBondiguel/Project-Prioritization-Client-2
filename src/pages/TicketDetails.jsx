import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  Card,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { useNavigate, useParams, Link, Outlet } from "react-router-dom";
import TicketDetailsHeader from "../components/tickets/TicketDetailsHeader";
import { useGlobalState } from "../utils/StateContext";
import { getTicket, deleteTicket } from "../services/ticketServices";
import Feedbacks from "../components/Feedbacks";
import dateFormat from "dateformat";
import iceScoreCalculation from "../components/ICE_Score";

export default function TikcetDetails() {
  let navigate = useNavigate();
  const { _id } = useParams();
  const { store, dispatch } = useGlobalState();

  const { loggedInUser, ticket } = store;
  const user = JSON.parse(loggedInUser); // get user info form global state

  useEffect(() => {
    // get single ticket using global reducer
    const fetchTicket = async () => {
      const result = await getTicket(_id);
      dispatch({ type: "getTicket", data: result });
    };

    fetchTicket();
  }, [dispatch, _id]);

  //setup onClick for delete button
  function handleDelete() {
    deleteTicket(_id).then(() => {
      dispatch({ type: "deleteTicket", data: _id });
      navigate("/mytickets");
    });
  }

  if (!ticket || !user) return null;
  // -------------------------------
  //  conditon to change the button show or disabled
  let box = "none";
  if (
    (user._id === ticket.author._id && !ticket.isSubmitted) ||
    user.role === "manager"
  ) {
    box = "";
  }

  let delButton = false;
  let colorButton = "success";
  if (ticket.isSubmitted && user.role === "manager") {
    delButton = true;
    colorButton = "warning";
  }
  // ----------------------------
  return (
    <Container className="main-content-container px-4 pb-4">
      <TicketDetailsHeader />

      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={8}>
          <Card sx={{ p: 5 }}>
            <Typography variant="h4" sx={{ color: "text.primary" }}>
              {ticket.initialtive}
              {"   "}
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
              {ticket.author.firstName} {ticket.author.lastName}
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
              style={{ wordWrap: "break-word" }}
            >
              {ticket.description}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ p: 4, pb: 3 }}>
            <Typography variant="subtitle1" noWrap>
              Target:{" "}
              <Chip
                label={`${ticket.target}`}
                color={colorButton}
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
              color={colorButton}
              component={Link}
              to={`/mytickets/update/${_id}`}
              state={{
                ticket: JSON.stringify(ticket),
              }}
            >
              {delButton ? "Update" : "Edit"}
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
{/* Only users' role is manager, they can add feedback */}
        <Grid item md={3} lg={3}> 
          {user.role === "manager" && user._id !== ticket.author._id ? (
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="feedback"
              state={{
                ticket: JSON.stringify(ticket),
              }}
            >
              Add Feedback
            </Button>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {ticket.author._id === user._id || user.role === "manager" ? (
            <>
              <Feedbacks />
              <Outlet />
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
