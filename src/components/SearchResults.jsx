import React from "react";
import { useGlobalState } from "../utils/StateContext";
import {TicketTable} from "./tickets/TicketTable.js";
import {Stack, Typography, Container} from "@mui/material"

  function SearchResults(){
    const {store} = useGlobalState();
    const {filteredTickets} = store;

    return (
      <div>
        <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          mt={5}
        >
          <Typography variant="h4" gutterBottom>
            Search Results
          </Typography>
        </Stack>
        <TicketTable tickets={filteredTickets} />
        </Container>
      </div>
    );
}

export default SearchResults;