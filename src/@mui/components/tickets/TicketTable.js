import React from 'react'

export default function TicketTable(data) {
   const tickets =data.tickets
    if (!tickets) return;
    console.log(tickets)
  return (
    <>
    {tickets.map((ticket)=> <p>{ticket.initialtive}</p>)}
    </>
  )
}
