import React, { useState } from "react";
import { Grid, Typography, Button, Paper, NativeSelect, Container } from "@mui/material";
import { useGlobalState } from "../utils/StateContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { createTicket, updateTicket } from "../services/ticketServices";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EditOrNewTicketHeader from './tickets/EditOrNewTicketHeader'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { v4 as uuidv4 } from "uuid";

/**
 * TicketForm is also used for the edit page
 * How it works is that coming from the TicketDetails page, we're sending
 * the same data to this component. The way to access the data that we sent
 * is via `useLocation()` hook.
 * e.g.
 * in TicketDetails.jsx
 * const navigate = useNavigate() // this is how to send data
 * <button onClick={navigate(`/mytickets/update/${id}`, { state }) />
 *
 * in TicketForm.jsx
 * const location = useLocation() // this is how to receive data
 * const [formState, setFormState] = useState(initialState)
 * useEffect(() => {
 *    setFormState(location.state)
 * }, [location.state])
 */

const target = ["Free", "Pro", "Teams", "Education", "All", "Others"];

function TicketForm() {
  const location = useLocation();
  // console.log(location.state)

  if (location.state) {
    var ticket = JSON.parse(location.state.ticket);
    var initialDate = ticket.dueDate;
  } else {
    initialDate = null;
  }

  const initialFormState = {
    initialtive: "",
    description: "",
    target: "",
    dueDate: Date.now(),
    impact: "",
    confidence: "",
    effort: "",
    feedback: "",
  };

  const [formState, setFormState] = useState(ticket || initialFormState);
  const { dispatch, store } = useGlobalState();
  const { impacts, confidences, efforts } = store;
  // ! date is in ininitialFormState no need another one
  const [dateValue, setDateValue] = useState(initialDate); //for date picker

  const { _id } = useParams();
  let navigate = useNavigate();

  function handleChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  function handleClick({ isSubmitted = false }) {
    return (event) => {
      event.preventDefault();
      //if statement to handle update ticket and create ticket
      if (_id) {
        // from saved ticket to submitted
        updateTicket({
          id: _id,
          ...formState,
          isSubmitted: isSubmitted,
          dueDate: dateValue,
        })
          .then(() => {
            dispatch({
              type: "updateTicket",
              data: {
                id: _id,
                ...formState,
                isSubmitted: isSubmitted,
                dueDate: dateValue,
              },
            });
            //if user update ticket with form, leave ticket to show on the page.
            navigate(`/mytickets`);
          })
          .catch((error) => console.log(error));
      } else {
        // from creation to submitted
        createTicket({
          ...formState,
          ticket_id: uuidv4(),
          isSubmitted: isSubmitted,
          dueDate: dateValue,
        })
          .then((ticket) => {
            dispatch({ type: "addTicket", data: ticket });
            //we can navigate back to the my tickets page once we create a ticket.
            isSubmitted
              ? navigate("/submissionsuccess")
              : navigate("/mytickets");
          })
          .catch((error) => console.log(error));
      }
    };
  }

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <EditOrNewTicketHeader id={_id}/>
      <Paper elevation={3}>
        <Typography variant="h4" align="left">
          New Ticket
        </Typography>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <form>
              <Typography>Initiative:</Typography>
              <input
                type="text"
                name="initialtive"
                value={formState.initialtive}
                onChange={handleChange}
              ></input>

              <Typography>Description:</Typography>
              <textarea
                type="text"
                name="description"
                value={formState.description}
                onChange={handleChange}
              ></textarea>

              <Typography>Target:</Typography>
              <NativeSelect
                name="target"
                value={formState.target}
                onChange={handleChange}
              >
                {target.map((target) => (
                  <option key={target} value={target}>
                    {target}
                  </option>
                ))}
              </NativeSelect>

              <Typography>Due Date:</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={dateValue}
                  label="dueDate"
                  onChange={(v) => {
                    setDateValue(v);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </form>
          </Grid>

          <Grid item xs={8}>
            <form>
              <Typography>Impact:</Typography>
              <NativeSelect
                name="impact"
                value={formState.impact}
                onChange={handleChange}
              >
                {impacts.map((impact) => (
                  <option key={impact.name} value={impact.name}>
                    {impact.name}
                  </option>
                ))}
              </NativeSelect>

              <Typography>Confidence:</Typography>
              <NativeSelect
                name="confidence"
                value={formState.confidence}
                onChange={handleChange}
              >
                {confidences.map((confidence) => (
                  <option key={confidence.name} value={confidence.name}>
                    {confidence.name}
                  </option>
                ))}
              </NativeSelect>

              <Typography>Effort:</Typography>
              <NativeSelect
                name="effort"
                value={formState.effort}
                onChange={handleChange}
              >
                {efforts.map((effort) => (
                  <option key={effort.name} value={effort.name}>
                    {effort.name}
                  </option>
                ))}
              </NativeSelect>

              <Typography>Feedback:</Typography>
              <textarea
                type="text"
                name="feedback"
                value={formState.feedback}
                onChange={handleChange}
              ></textarea>
            </form>
          </Grid>
        </Grid>
        <br></br> <br></br> {/** search for mui spacer components */}
        {/* If id is in the url, that means we update the ticket. If id is not in the url, that means we create a new ticket. */}
        <Grid container spacing={1}>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="warning"
              onClick={handleClick({ isSubmitted: false })}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="success"
              onClick={handleClick({ isSubmitted: true })}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default TicketForm;
