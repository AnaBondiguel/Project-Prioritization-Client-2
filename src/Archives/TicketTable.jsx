import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import iceScoreCalculation from "../components/ICE_Score";

function TicketTable({ tickets }) {
  if(!tickets) return;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Priority</TableCell>
            <TableCell align="left">Initiative</TableCell>
            <TableCell align="left">Target</TableCell>
            <TableCell align="left">ICE Score</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tickets.map((ticket, index) => {
            return (
              <TableRow
                key={ticket.initialtive}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{ticket.priority} </TableCell>

                <Link key={ticket._id} to={`/mytickets/${ticket._id}`}>
                  <TableCell align="right">{ticket.initialtive} </TableCell>
                </Link>

                <TableCell align="left">{ticket.target} </TableCell>
                <TableCell align="left">
                  {iceScoreCalculation(
                    ticket.impact,
                    ticket.confidence,
                    ticket.effort
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TicketTable;
