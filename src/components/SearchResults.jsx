import React from "react";
import { useGlobalState } from "../utils/StateContext";
import TicketTable from "./TicketTable";

  function SearchResults(){
<<<<<<< HEAD
    const {store} = useGlobalState();
    const {filteredTickets} = store;
=======
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
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7

    return (
        <div>
            <h1>Search Results</h1>
<<<<<<< HEAD
               <TicketTable 
               tickets={filteredTickets}
               />
=======
                <ul>
                    {getFilteredTickets().map((ticket, index) => {
                        return <li key={index}><Link to={ticket}>{ticket}</Link></li>;
                    })}
                </ul>
>>>>>>> 4b380258792c3c4062d989c070d259452d1fa7d7
        </div>
    );
}

export default SearchResults;