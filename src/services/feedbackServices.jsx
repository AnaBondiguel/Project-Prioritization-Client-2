import projectAPI from "../config/api";

export async function getFeedback(ticketid) {
    const response = await projectAPI.get(`/api/tickets/${ticketid}/feedbacks`)
    return response.data;
}

export async function createFeedback(feedback) {
  const response = await projectAPI.post(
    `/api/tickets/${feedback.ticketId}/feedbacks`,
    feedback
  );
 return response.data;
}