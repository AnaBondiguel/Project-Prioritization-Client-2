import React, { useEffect } from "react";
import { Typography, Card, Stack, Grid, Button } from "@mui/material";
import { useGlobalState } from "../utils/StateContext";
import { getFeedback } from "../services/feedbackServices";
import { useParams } from "react-router-dom";

export default function Feedbacks() {
  const { store, dispatch } = useGlobalState();
  const { feedbacks } = store;
  // console.log(feedbacks);
  // const user = JSON.parse(store.loggedInUser)
  const { _id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"))

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
          <Grid container spacing={1} key={feedback._id}>
            <Grid item xs={10} md={10} lg={10}>
              <Card
                
                sx={{ pl: 1, pt: 1, background: "#7DAFC2", mt: 1 }}
              >
                <Typography variant="h6">{feedback.context}</Typography>
                <Typography
                  variant="body2"
                  align="right"
                  sx={{ color: "text.secondary", mr: 5 }}
                >
                  By {feedback.feedbackBy.firstName}{" "}
                  {feedback.feedbackBy.lastName}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
              {feedback.feedbackBy._id === user.id ?
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{m: 3}}
                // onClick={handleDelete}
              >
                Delete
              </Button> : <></>}
            </Grid>
          </Grid>
        ))}
      </>
    );
  } else {
    return <></>;
  }
}
