import projectAPI from "../config/api";


function transformTicket(ticket) {
 let transformedTicket = {
    author: ticket.author,
    initialtive: ticket.initialtive,
    description: ticket.description,
    target: ticket.target,
    impact: ticket.impact,
    confidence: ticket.confidence,
    effort: ticket.effort,
    dueDate: ticket.dueDate,
    isSubmitted: ticket.isSubmitted,
    _id: ticket._id,
  };
  return transformedTicket;
}

//get my tickets
export async function getTickets() {
  const response = await projectAPI.get('/api/tickets/myTickets');
  return response.data;
  // return tickets;
}

//get all the tickets
export async function getAllTickets() {
  const response = await projectAPI.get('/api/tickets/submitted');
  return response.data;
  // return tickets;
}


//get a single ticket
export async function getTicket(id) {
  const response = await projectAPI.get(`/api/tickets/${id}`);
  let ticket = response.data;
  return ticket ? transformTicket(ticket) : null
  // const ticket = tickets.find(
  //   (ticket) => ticket.id.toString() === id.toString()
  // );
  // return ticket ? transformTicket(ticket) : null;
}

//create a ticket
export async function createTicket(ticket) {
  //  return ticket;
  const response = await projectAPI.post('/api/tickets/new', ticket);
	return response.data;
}
// console.log("hello")


//delete a ticket
export async function deleteTicket(id) {
  //  return id;
  const response = await projectAPI.delete(`/api/tickets/${id}`);
	return response.data;
}

//update a ticket
export async function updateTicket(ticket) {
   //return ticket;

	const response = await projectAPI.put(`/api/tickets/${ticket._id}`, ticket);
	return response.data;
}

