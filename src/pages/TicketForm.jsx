import React, { useState } from "react";
import { useGlobalState } from "../utils/StateContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// @mui
import {
  Grid,
  Button,
  Container,
  Card,
  Select,
  Stack,
  Typography,
  Chip,
  Alert,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import dateFormat from "dateformat";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// ----------------------------------------------------------------
// hooks
import { createTicket, updateTicket } from "../services/ticketServices";
//  component Header of the page
import EditOrNewTicketHeader from "../components/tickets/EditOrNewTicketHeader";

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

//  differer way to get enum compart to impact, confidence and effort
const target = ["Free", "Pro", "Teams", "Education", "All", "Others"];

function TicketForm() {
  const location = useLocation();
  // console.log(location.state)
  const initialFormState = {
    initialtive: "",
    description: "",
    target: "Others",
    dueDate: Date.now(),
    impact: "?",
    confidence: "?",
    effort: "?",
  };
  let ticket = initialFormState;
  let initialDate = null;

  if (location.state) {
    ticket = JSON.parse(location.state.ticket);
    initialDate = ticket.dueDate;
  }

  const [formState, setFormState] = useState(ticket);
  const { dispatch, store } = useGlobalState();
  const { impacts, confidences, efforts } = store;
  const [dateValue, setDateValue] = useState(initialDate); //for date picker
  const [error, setError] = useState([]); // error messages
  const user = JSON.parse(localStorage.getItem("user"));
  const { _id } = useParams(); // get ticket id from params
  let navigate = useNavigate();

  function handleChange(event) {
    setError([]);
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  function handleClick(event) {
    event.preventDefault();
    //if statement to handle update ticket and create ticket
    if (_id) {
      // from saved ticket to submitted
      updateTicket({
        _id: _id,
        ...formState,
        isSubmitted: event.target.value,
        dueDate: dateValue,
      })
        .then(() => {
          dispatch({
            type: "updateTicket",
            data: {
              id: _id,
              ...formState,
              isSubmitted: event.target.value,
              dueDate: dateValue,
            },
          });
          //if user update ticket with form, leave ticket to show on the page.
          navigate(`/mytickets/${_id}`, {
            state: { ticket: JSON.stringify(ticket) },
          });
        })
        .catch((error) =>
          setError(error.response.data.errors || error.response.data.error)
        );
    } else {
      // from creation to submitted
      console.log(event.target.value);
      createTicket({
        ...formState,
        ticket_id: uuidv4(),
        isSubmitted: event.target.value,
        dueDate: dateValue,
      })
        .then((ticket) => {
          dispatch({ type: "addTicket", data: ticket });
          //we can navigate back to the my tickets page once we create a ticket.
          event.target.value === "false"
            ? navigate("/mytickets")
            : navigate("/submissionsuccess");
        })
        .catch((error) =>
          setError(error.response.data.errors || error.response.data.error)
        );
    }
  }

  // ----------------------------------------------------------------
  //  this is conditon redering to control the button to show different content
  let saveButton = false;
  let colorButton = "success";
  if (ticket && ticket.isSubmitted) {
    saveButton = true;
    colorButton = "warning";
  }
  // ----------------------------

  return (
    <Container className="main-content-container px-4 pb-4">
      <EditOrNewTicketHeader id={_id} />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={8}>
          {ticket && ticket.isSubmitted && ticket.author._id !== user.id ? (
            <Card sx={{ p: 5 }}>
              <Typography variant="h4" sx={{ color: "text.primary" }} noWrap>
                {`${ticket.initialtive}`}
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
                {`${ticket.author.firstName}` +
                  " " +
                  `${ticket.author.lastName}`}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "info.main" }}
                noWrap
              >
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
                style={{ wordWrap: "break-word" }}
              >
                {ticket.description}
              </Typography>
            </Card>
          ) : (
            <Card sx={{ p: 5 }}>
              <Grid item md={9} xs={12}>
                <TextField
                  fullWidth
                  label="Initiative"
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
          )}
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ p: 4, pb: 3 }}>
            <FormControl sx={{ m: 1, minWidth: 180 }}>
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

            <FormControl sx={{ m: 1, minWidth: 180 }}>
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

            <FormControl sx={{ m: 1, minWidth: 180 }}>
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

            <FormControl sx={{ m: 1, minWidth: 180 }}>
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
              <FormHelperText>Effort of the project?</FormHelperText>
            </FormControl>

            {
              // -----------------------------------
              //check error type and condition
              error && typeof error === "string" ? (
                <Alert variant="outlined" severity="error" sx={{ m: 1 }}>
                  {error}
                </Alert>
              ) : error ? (
                error.map((err, i) => (
                  <Alert
                    key={i}
                    variant="outlined"
                    severity="error"
                    sx={{ m: 1 }}
                  >
                    {err.msg}
                  </Alert>
                ))
              ) : (
                <></>
              )
              //-------------------------------------
            }
          </Card>
          <Stack direction="row" mt={2} spacing={2}>
            <Button
              variant="contained"
              color="warning"
              value={false}
              onClick={handleClick}
              disabled={saveButton}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color={colorButton}
              value={true}
              onClick={handleClick}
            >
              {saveButton ? "Update" : "Submit"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TicketForm;
