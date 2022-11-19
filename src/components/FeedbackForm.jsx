import React, {useState} from 'react'
import { useGlobalState } from "../utils/StateContext";
import {useParams, useNavigate } from 'react-router-dom'
import {TextField,Button} from '@mui/material'

import {
  createFeedback
} from "../services/feedbackServices";

export default function FeedbackForm() {
  const [context, setContext] = useState("")
  const {store, dispatch} = useGlobalState();
  const {loggedInUser} =store;
  const user = JSON.parse(loggedInUser)
  const { _id } = useParams();
  const navigate = useNavigate();
  // console.log(_id)
 
  const handleSubmit = async (event) =>{
      event.preventDefault();
      
      if (!user) return;

      createFeedback({
        context: context,
        feedbackBy: user.id,
        ticketId: _id,
      }).then((feedback) => {
        dispatch({ type: "createFeedbacks", data: feedback });
        navigate(0)
      }).catch((error) => console.log(error));


  }

  return (
    <>
      <TextField
        fullWidth
        label="Feedback"
        name="context"
        onChange={(e) => setContext(e.target.value)}
        multiline
        rows={3}
        sx={{ mt: 5, mb:2}}
        value={context}
      />

      <Button
        
        variant="contained"
        color="success"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
}
