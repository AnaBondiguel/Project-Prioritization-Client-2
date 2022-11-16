import React, {useEffect} from 'react'
import { useGlobalState } from "../utils/StateContext";
import {getFeedback} from '../services/feedbackServices';
import { useParams } from "react-router-dom";


export default function Feedbacks() {
  const {store,dispatch} = useGlobalState();
  const {feedbacks} = store
 console.log(feedbacks)
  // const user = JSON.parse(store.loggedInUser)
  const { _id } = useParams();
  
  useEffect(() =>{
    const fetchFeedback = async () =>{
      const response = await getFeedback(_id)
      dispatch({ type: "setFeedbacks", data: response})
    }

   
      fetchFeedback()
    
  }, [dispatch, _id])
  
  return (
    <>
  <h1> This is Feedback form page</h1>
  <p>{feedbacks.findFeedback[0].context}</p>
    </>

  );
}
