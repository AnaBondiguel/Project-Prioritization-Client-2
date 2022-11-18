import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const CustomerListToolbar = (props) => (
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
        Submitted Tickets
      </Typography>
    </Box>
  </Box>
);
