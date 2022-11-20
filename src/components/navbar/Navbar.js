import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Drawer, Typography, Avatar, Divider } from "@mui/material";
// hooks
import useResponsive from "../../@mui/hooks/useReponsive";
// components
import stringAvatar from "../../@mui/theme/stringAvatar.js";
// import Logo from "../../../components/logo";
import Scrollbar from "../../@mui/components/scrollbar/Scrollbar";
import NavSection from "../nav-section/NavSection";
//
import navConfig from "./config";
import { useGlobalState } from "../../utils/StateContext.jsx";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------




export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");
  // ----------------------------------------------------------------------
  const { store } = useGlobalState();
  const { loggedInUser } = store;
  const user = JSON.parse(loggedInUser);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 3, py: 1, display: "inline-flex" }}>
        <h2 style={{ color: "#50bdd8" }}>Project Priorization</h2>
      </Box>
      <Divider />
      <Box sx={{ mb: 5, mx: 2.5, mt: 5 }}>
        <StyledAccount>
          <Avatar
            {...stringAvatar(
              `${user.firstName[0]} ${user.lastName[0]}`
            )}
          />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              {user.email}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {user.role}
            </Typography>
          </Box>
        </StyledAccount>
      </Box>
      <Divider />
      <NavSection data={navConfig} sx={{ mt: 5, mb: 5 }} />

      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ px: 4, pb: 1, mt: 5 }}>
        <span style={{ color: "#ddd" }}>Copyright @2022</span>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH }
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              // -----------------
              // bgcolor: "#FFFFFF",
              // -------------------
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
