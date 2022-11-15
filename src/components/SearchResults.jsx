import React, { useState } from "react";
// import { getFilteredProjects } from './Header';
import {Link} from "react-router-dom";

  function SearchResults(){
    let initialData = {
        tickets: [],
        userInput: "",
      };
    
      const [data] = useState(initialData);

    function getFilteredTickets() {
        if(!data.userInput) {
            return data.tickets;
        }
        let filteredTickets = data.tickets.filter((ticket) => {
            return ticket.includes(data.userInput);
        });
        return filteredTickets;
      }

    return (
        <div>
            <h1>Search Results</h1>
                <ul>
                    {getFilteredTickets().map((ticket, index) => {
                        return <li key={index}><Link to={ticket}>{ticket}</Link></li>;
                    })}
                </ul>
        </div>
    );
}

export default SearchResults;