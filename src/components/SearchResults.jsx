import React from "react";
import { useGlobalState } from "../utils/StateContext";
import { TicketTable } from "./tickets/TicketTable.js";
import { Stack, Typography, Container, Paper } from "@mui/material";

function SearchResults() {
  const { store } = useGlobalState();
  const { filteredTickets } = store;

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
