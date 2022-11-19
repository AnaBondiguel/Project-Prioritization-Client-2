import React, { useEffect } from "react";
import { Typography, Card, Stack } from "@mui/material";
import { useGlobalState } from "../utils/StateContext";
import { getFeedback } from "../services/feedbackServices";
import { useParams } from "react-router-dom";

export default function Feedbacks() {
  const { store, dispatch } = useGlobalState();
  const { feedbacks } = store;
  // console.log(feedbacks);
  // const user = JSON.parse(store.loggedInUser)
  const { _id } = useParams();

  useEffect(() => {
    const fetchFeedback = async () => {
      const response = await getFeedback(_id);
      // console.log(response);
      dispatch({ type: "setFeedbacks", data: response.findFeedback });
    };

    fetchFeedback();
  }, [dispatch, _id]);

  // console.log(feedbacks);

  if (!feedbacks) return;

  if (feedbacks.length > 0) {
    return (
      <>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
          mb={1}
        >
          <Typography variant="h5" gutterBottom>
            Feedbacks
          </Typography>
        </Stack>

        {feedbacks.map((feedback) => (
          <Card key={feedback._id} sx={{ p: 0.5, background: "#7DAFC2", mt: 1, maxWidth: 800 }}>
            <Typography  variant="h6">
              {feedback.context}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              By {feedback.feedbackBy.firstName} {feedback.feedbackBy.lastName}
            </Typography>
          </Card>
        ))}
      </>
    );
  } else {
    return <></>;
  }
}
