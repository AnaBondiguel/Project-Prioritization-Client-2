import { useState } from "react";
import iceScoreCalculation from "../ICE_Score";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
//  mui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Chip,
  Paper,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
// ---------------------------

export const TicketTable = (data) => {
  // data is value passed from prvious page
  const tickets = data.tickets;
  // get href value for condition rendering
  const listing = window.location.href;
  
  // -------------------------------
  // table control
  // how many rows show for a single table page
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  // --------------------------------

  if (!tickets) return;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#92CEC1" }}>
              {listing.includes("listing") || //this conition rendering when in different page
              listing.includes("searchresults") ? (
                <TableCell>Author</TableCell>
              ) : (
                <TableCell />
              )}
              <TableCell>Initiative</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>ICE</TableCell>
              <TableCell>Launch Date</TableCell>
              {listing.includes("listing") ||
              listing.includes("searchresults") ? (
                <TableCell />
              ) : (
                <TableCell>Status</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.slice(page * limit, page * limit + limit).map((ticket) => (
              <TableRow
                key={ticket._id}
                // ----------------------------------------------------------------
                // set rows color different and hover color
                sx={{
                  "&:nth-of-type(even)": {
                    backgroundColor: "#ededed",
                  },
                  "&:hover": {
                    backgroundColor: "#ddd",
                  },
                }}
                // ---------------------------------------------------------------
              >
                {listing.includes("listing") ||
                listing.includes("searchresults") ? (
                  <TableCell sx={{ color: "#204969" }}>
                    {`${ticket.author.firstName}` +
                      " " +
                      `${ticket.author.lastName}`}
                  </TableCell>
                ) : (
                  <TableCell />
                )}
                <TableCell>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      component={Link}
                      to={`/mytickets/${ticket._id}`}
                    >
                      {ticket.initialtive}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{ticket.target}</TableCell>
                <TableCell sx={{ color: "#008c9e" }}>
                  {iceScoreCalculation(
                    ticket.impact,
                    ticket.confidence,
                    ticket.effort
                  )}
                </TableCell>
                <TableCell>
                  {dateFormat(ticket.dueDate, "mm/dd/yyyy")}
                </TableCell>

                {listing.includes("listing") ||
                listing.includes("searchresults") ? (
                  <TableCell />
                ) : (
                  <TableCell>
                    {ticket.isSubmitted ? (
                      <Chip label="Submitted" color="success" size="small" />
                    ) : (
                      <Chip label="Not Submit" color="primary" size="small" />
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tickets.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
      />
    </Paper>
  );
};
