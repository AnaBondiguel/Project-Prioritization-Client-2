import React, {useState} from 'react'
import { useGlobalState } from "../utils/StateContext";
import {useParams } from 'react-router-dom'
import {
  createFeedback
} from "../services/feedbackServices";

export default function FeedbackForm() {
  const [context, setContext] = useState("")
  const {store, dispatch} = useGlobalState();
  const {loggedInUser} =store;
  const user = JSON.parse(loggedInUser)
  const { _id } = useParams();
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
      });


  }

  return (
    <>
      <p>add feedback</p>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="feedback"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        ></textarea>
        <br/>
        <button>Add Feedback</button>
      </form>
      
    </>
  );
}
