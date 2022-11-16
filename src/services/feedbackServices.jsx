import projectAPI from "../config/api";

export async function getFeedback(ticketid) {
    const response = await projectAPI.get(`/api/tickets/${ticketid}/feedbacks`)
    return response.data;
}