import React from "react";
import { useGlobalState } from "../utils/StateContext";
import { TicketTable } from "./tickets/TicketTable.js";
import { Stack, Typography, Container, Paper } from "@mui/material";
import {useLocation} from "react-router-dom"

function SearchResults() {
  const { store } = useGlobalState();
  const { filteredTickets } = store;
  const location = useLocation();
 
  return (
    <div>
      <Container>
        <Stack
          direction="column"
         
          justifyContent="space-between"
          mb={5}
          mt={5}
        >
          <Typography variant="h4" gutterBottom>
            Search Results for 
          </Typography>
          <Typography variant="h5" >
           for "{location.state.input}"
          </Typography>
        </Stack>
        {filteredTickets && !filteredTickets.length > 0 ? (
          <Paper
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h6" paragraph>
              Not found
            </Typography>

            <Typography variant="body2">
              No results found
              <br /> Try checking for typos or using complete words.
            </Typography>
          </Paper>
        ) : (
          <TicketTable tickets={filteredTickets} />
        )}
      </Container>
    </div>
  );
}

export default SearchResults;
