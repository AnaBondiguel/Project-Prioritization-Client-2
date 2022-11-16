import React, {useEffect} from 'react'
import { useGlobalState } from "../utils/StateContext";
import {getFeedback} from '../services/feedbackServices'


export default function Feedbacks({ticket}) {
  const {feedback,store,dispatch} = useGlobalState();
  // console.log(store.loggedInUser)
  // console.log(ticket)
  const user = JSON.parse(store.loggedInUser)
  useEffect(() =>{
    const fetchFeedback = async () =>{
      const response = await getFeedback(ticket._id)
      dispatch({ type: "setFeedbacks", data: response})
    }

    if (user.role === "manager" || user.id === ticket.author.id) {
      fetchFeedback()
    }
  }, [dispatch, user, ticket])
  
  return (
    <>
  <h1> This is Feedback form page</h1>
    </>

  );
}
