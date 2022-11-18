import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import {Link} from "react-router-dom"


export const MyTickets = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        mt: -3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        My Tickets
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          component={Link}
          to="/newticket"
          color="primary"
          variant="contained"
        >
          Add Ticket
        </Button>
      </Box>
    </Box>
  </Box>
);
