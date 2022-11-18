import { useState } from "react";
import iceScoreCalculation from "../../../components/ICE_Score";
import { Link } from "react-router-dom";

import dateFormat from "dateformat";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

export const TicketTable = (data) => {
  const tickets = data.tickets;
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  console.log(tickets);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  if (!tickets) return;

  return (
     
      <Card>
     
        <Box sx={{ minWidth: 850 }}>
          
          <Table>
            
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Initialtive</TableCell>
                <TableCell>Target</TableCell>
                <TableCell>ICE</TableCell>
                <TableCell>Launch Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.slice(0, limit).map((ticket) => (
                <TableRow hover key={ticket._id}>
                  <TableCell />
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      {/* <Avatar src={customer.avatarUrl} sx={{ mr: 2 }} /> */}

                      <Typography
                        color="textPrimary"
                        variant="body1"
                        component={Link}
                        to={`/mytickets/${ticket._id}`}
                        state={{
                          ticket: JSON.stringify(ticket),
                        }}
                      >
                        {ticket.initialtive}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{ticket.target}</TableCell>
                  <TableCell>
                    {iceScoreCalculation(
                      ticket.impact,
                      ticket.confidence,
                      ticket.effort
                    )}
                  </TableCell>
                  <TableCell>
                    {dateFormat(ticket.dueDate, "mm/dd/yyyy")}
                  </TableCell>
                  <TableCell>
                    {ticket.isSubmitted ? (
                      <Chip label="Not Submit" color="primary" size="small" />
                    ) : (
                      <Chip label="Submitted" color="success" size="small" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
           
          </Table>
          
        </Box>
      
      <TablePagination
        component="div"
        count={tickets.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    
  );
};
