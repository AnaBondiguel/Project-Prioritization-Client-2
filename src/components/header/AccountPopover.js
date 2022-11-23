import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../utils/StateContext.jsx";
import { logout } from "../../services/authServices.jsx";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
import stringAvatar from "../../@mui/theme/stringAvatar";

// drop down menu items------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Profile",
    to: "/profile",
  },
];


export default function AccountPopover() {
 // condition ------------------------------- 
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  // -----------------------------------------
  
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;
  const user = JSON.parse(loggedInUser);
  function handleLogout(event) {
    event.preventDefault();
    logout().then(() => {
      dispatch({ type: "setLoggedInUser", data: null });
      dispatch({ type: "setToken", data: null });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    });
  }

  if (!user) return;
  // -------------------------------
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar
          {...stringAvatar(
            `${user.firstName[0]} ${user.lastName[0]}`
          )}
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.firstName + " " + user.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={handleClose}
              component={Link}
              to={`${option.to}`}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
