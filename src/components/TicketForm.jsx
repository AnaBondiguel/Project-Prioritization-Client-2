import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Paper, NativeSelect } from "@mui/material";
import { useGlobalState } from "../utils/StateContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  createTicket,
  updateTicket,
} from "../services/ticketServices";
import FileBase from "react-file-base64";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
<<<<<<< HEAD
import { v4 as uuidv4 } from 'uuid';
=======
import { v4 as uuidv4 } from "uuid";
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7

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

const target = ["Free", "Pro", "Teams", "Education", "All", "Others"]

function TicketForm() {
  const location = useLocation();
<<<<<<< HEAD
  // console.log(location.state);
=======
  // console.log(location.state)
  
  if (location.state) {
  var ticket = JSON.parse(location.state.ticket) 
  var initialDate = ticket.dueDate;
} else {
  initialDate = null;
}
  // console.log(ticket);
  

>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7
  const initialFormState = {
    initialtive: "",
    description: "",
    target: "",
    dueDate: Date.now(),
    impact: "",
    confidence: "",
    effort: "",
    // selectedFile: "",
<<<<<<< HEAD
=======
    feedback: "",
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7
    // isSubmitted: false,
  };
  // const {
  //     enableInitiative = false,
  //     enableDescription = true,
  //     enableTargetId = true,
  //     enableImpactId = true,
  //     enableConfidenceId = true,
  //     enableEffortId = true,
  //     enableSelectedFile = true,
  // } = props;
<<<<<<< HEAD
 
  const [formState, setFormState] = useState(initialFormState);
  const { dispatch, store } = useGlobalState();
  const { targets, impacts, confidences, efforts } = store;
  const [dateValue, setDateValue] = React.useState(null); //for date picker
 
  let { _id } = useParams();
=======
  // const [ticket, setTicket] = useState(null);
  const [formState, setFormState] = useState(initialFormState);
  const { dispatch, store } = useGlobalState();
  const { impacts, confidences, efforts } = store;
  // ! date is in ininitialFormState no need another one
  const [dateValue, setDateValue] = useState(initialDate); //for date picker

  const { id } = useParams();
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7
  let navigate = useNavigate();

  useEffect(() => {
    // /tickets/new
    // location.state = undefined
    // setFormState(undefined)
    //setFormState(location.state)

    // state = initialFormState
<<<<<<< HEAD
    setFormState((state) => {
      console.log(formState.dueDate)
=======
    setFormState((state) => {     
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7
      return {
        ...state, // this is the initialFormState
        ...ticket, // this is the ticket details
      };
    });
<<<<<<< HEAD
    
  }, [location.state]);
=======
  }, [ticket]);
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7


  function handleChange(event) {
    // console.log("Event is: " + JSON.stringify(event))
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
    
    // console.log(location);
    // console.log(dateValue)
    // console.log(props);
    // console.log(event.target.value);
  }

  // <button onClick={handleClick()}>Save</button>
  // <button onClick={handleClick({ isSubmitted: true })}>Submit</button>
  // updateTicket -> PUT /api/tickets
  // createTicket -> POST /api/tickets
  function handleClick({ isSubmitted = false }) {
<<<<<<< HEAD
    console.log(_id)
    return (event) => {
      event.preventDefault();
      //if statement to handle update ticket and create ticket
      console.log(_id)
      if (_id) {
        // from saved ticket to submitted
        updateTicket({ id: _id, ...formState, isSubmitted: isSubmitted,  dueDate: dateValue})
          .then(() => {
            dispatch({
              type: "updateTicket",
              data: { id: _id, ...formState, isSubmitted: isSubmitted,  dueDate: dateValue },
            });
            //if user update ticket with form, leave ticket to show on the page.
            navigate(`/mytickets/${_id}`);
          })
          .catch((error) => console.log(error));

      } else {
        // from creation to submitted
         createTicket({ ...formState, ticket_id: uuidv4(), isSubmitted: isSubmitted,  dueDate: dateValue })
          .then((ticket) => {
            dispatch({ type: "addTicket", data: ticket });
            //we can navigate back to the my tickets page once we create a ticket.
            isSubmitted ? navigate('/submissionsuccess') : navigate("/mytickets");
            console.log(ticket)
=======
    return (event) => {
      event.preventDefault();
      //if statement to handle update ticket and create ticket
      if (id) {
        // from saved ticket to submitted
        updateTicket({ id: id, ...formState, isSubmitted: isSubmitted, dueDate: dateValue })
          .then(() => {
            dispatch({
              type: "updateTicket",
              data: {
                id: id,
                ...formState,
                isSubmitted: isSubmitted,
                dueDate: dateValue
              },
            });
            //if user update ticket with form, leave ticket to show on the page.
            navigate(`/mytickets/${id}`);
          })
          .catch((error) => console.log(error));
      } else {
        // from creation to submitted
        createTicket({
          ...formState,
          ticket_id: uuidv4(),
          isSubmitted: isSubmitted,
          dueDate: dateValue
        })
          .then((ticket) => {
            dispatch({ type: "addTicket", data: ticket });
            //we can navigate back to the my tickets page once we create a ticket.
            isSubmitted
              ? navigate("/submissionsuccess")
              : navigate("/mytickets");
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7
          })
          .catch((error) => console.log(error));
      }
    };
  }

  return (
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

<<<<<<< HEAD
            <br></br> <br></br>
          <Typography>Due Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DatePicker
                 value={dateValue}
                 label="dueDate"
                 onChange={(v)=>{
                   setDateValue(v)
                 } }
                 renderInput={(params) => <TextField {...params} />}
               />
            
            </LocalizationProvider> 
            
=======
            <Typography>Due Date:</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns} >
              <DatePicker
                value={dateValue}
                label="dueDate"
                onChange={(v)=>{
                  setDateValue(v)
                } }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7

            {/* <Typography>Upload files:</Typography>
            <input
              type="text"
              name="uselectedFile"
              value={formState.selectedFile}
              onChange={handleChange}
            ></input>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setFormState({ ...formState, selectedFile: base64 })
              }
            /> */}
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
          </form>
        </Grid>
      </Grid>
      <br></br> <br></br> {/** search for mui spacer components */}
<<<<<<< HEAD
     
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <Button variant="contained" color="warning" onClick={handleClick({ isSubmitted: false, _id: _id })}>
=======
      {/* If id is in the url, that means we update the ticket. If id is not in the url, that means we create a new ticket. */}
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <Button
            variant="contained"
            color="warning"
            onClick={handleClick({ isSubmitted: false })}
          >
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7
            Save
          </Button>
        </Grid>
        <Grid item xs={1}>
<<<<<<< HEAD
          <Button variant="contained" color="success" onClick={handleClick({ isSubmitted: true })}>
=======
          <Button
            variant="contained"
            color="success"
            onClick={handleClick({ isSubmitted: true })}
          >
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TicketForm;
