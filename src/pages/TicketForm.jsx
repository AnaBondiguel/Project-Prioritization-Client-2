import React, { useState } from "react";
import { Grid, Button, Container, Card, Select, Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

import { useGlobalState } from "../utils/StateContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { createTicket, updateTicket } from "../services/ticketServices";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EditOrNewTicketHeader from "../components/tickets/EditOrNewTicketHeader";
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

  let saveButton = false
  if (ticket.isSubmitted) {
    saveButton = true;
  }
  return (
    <Container className="main-content-container px-4 pb-4">
      <EditOrNewTicketHeader id={_id} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <Card sx={{ p: 5 }}>
            <Grid item md={9} xs={12}>
              <TextField
                fullWidth
                label="Initialtive"
                name="initialtive"
                onChange={handleChange}
                value={formState.initialtive}
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} mt={3}>
              <TextField
                fullWidth
                label="Descrpition"
                name="description"
                onChange={handleChange}
                multiline
                rows={5}
                value={formState.description}
                mt={5}
              />
            </Grid>

            <Grid item md={6} xs={12} mt={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={dateValue}
                  label="Launch Date"
                  onChange={(v) => {
                    setDateValue(v);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ p: 4, pb: 3 }}>
            <FormControl sx={{ m: 1, minWidth: 220 }}>
              <InputLabel>Target</InputLabel>
              <Select
                name="target"
                label="Target"
                value={formState.target}
                onChange={handleChange}
              >
                {target.map((target) => (
                  <MenuItem key={target} value={target}>
                    {target}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Target Audience</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel>Impact</InputLabel>
              <Select
                name="impact"
                label="Impact"
                value={formState.impact}
                onChange={handleChange}
              >
                {impacts.map((impact) => (
                  <MenuItem key={impact.name} value={impact.name}>
                    {impact.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Project Impact</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel>Confidence</InputLabel>
              <Select
                name="confidence"
                label="Confidence"
                value={formState.confidence}
                onChange={handleChange}
              >
                {confidences.map((confidence) => (
                  <MenuItem key={confidence.name} value={confidence.name}>
                    {confidence.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>How Confidence you are?</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel>Effort</InputLabel>
              <Select
                name="effort"
                label="Effort"
                value={formState.effort}
                onChange={handleChange}
              >
                {efforts.map((effort) => (
                  <MenuItem key={effort.name} value={effort.name}>
                    {effort.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Estimate Effort of the project?</FormHelperText>
            </FormControl>
          </Card>
          <Stack direction="row" mt={2} spacing={2}>
            <Button
              variant="contained"
              color="warning"
              onClick={handleClick({ isSubmitted: false })}
              disabled={saveButton}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleClick({ isSubmitted: true })}
            >
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TicketForm;
