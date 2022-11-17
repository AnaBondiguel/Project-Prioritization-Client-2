import React from "react";
import { useGlobalState } from "../utils/StateContext";
import TicketTable from "./TicketTable";

  function SearchResults(){
    const {store} = useGlobalState();
    const {filteredTickets} = store;

    return (
        <div>
            <h1>Search Results</h1>
               <TicketTable 
               tickets={filteredTickets}
               />
        </div>
    );
}

export default SearchResults;