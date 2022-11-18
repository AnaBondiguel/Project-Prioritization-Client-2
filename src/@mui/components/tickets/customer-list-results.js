import { useState } from "react";
import Scrollbar from "../scrollbar/Scrollbar";
// import { format } from "date-fns";
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
} from "@mui/material";
// import { getInitials } from "../../utils/get-initials";

export const CustomerListResults = (data) => {
  const tickets = data.tickets
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  if (!tickets) return;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Initialtive</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>ICE</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Submitted</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow hover key={ticket.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      {/* <Avatar src={customer.avatarUrl} sx={{ mr: 2 }} /> */}

                      <Typography color="textPrimary" variant="body1">
                        {ticket.initialtive}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{ticket.dueDate}</TableCell>
                  <TableCell>
                    {`${ticket.effort}, ${ticket.impact}, ${ticket.confidence}`}
                  </TableCell>
                 
                  {/* <TableCell>
                    {format(ticket.createdAt, "dd/MM/yyyy")}
                  </TableCell> */}
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
      </Scrollbar>
    </Card>
  );
};
