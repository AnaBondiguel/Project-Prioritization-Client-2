import projectAPI from "../config/api";


// const tickets = [
//   {
//     id: 1,
//     initiative: "Whiteboard on Pricing LP",
//     description: "Add whiteboard icon to the pricing page",
//     target: "Team",
//     impact: "Medium",
//     confidence: "Large",
//     effort: "small",
//     dueDate: "2022-03-12",
//     // user_id: 1,
//     ICE_Score: "24",
//     priority: "1",
//     feedback: "Great work",
//   },
//   {
//     id: 2,
//     initiative: "3 card Iform for free",
//     description: "3 card Iform for free",
//     target: "Edu",
//     impact: "Medium",
//     confidence: "Large",
//     effort: "small",
//     dueDate: "2022-01-11",
//     // user_id: 1,
//     ICE_Score: "21",
//     priority: "2",
//     feedback: "Well done",
//   },
// ];

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
  let updatedTicket = {
    initiative: ticket.initialtive,
		description: ticket.description,
    target: ticket.target,
    impact: ticket.impact,
    confidence: ticket.confidence,
    effort: ticket.effort,
    dueDate: ticket.duedate,
    ICE_Score: ticket.ICE_Score,
    priority: ticket.priority,
	}
	const response = await projectAPI.put(`/api/tickets/${ticket.id}`, updatedTicket);
	return response.data;
}

