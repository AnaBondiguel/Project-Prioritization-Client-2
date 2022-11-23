import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// global state and reducer
import { useGlobalState } from "../../utils/StateContext.jsx";
import { getAllTickets } from "../../services/ticketServices.jsx";
// @mui
import { styled } from "@mui/material/styles";
import {
  Input,
  Slide,
  Button,
  IconButton,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material";
import { bgBlur } from "../../@mui/cssStyles";
import Iconify from "../../@mui/components/iconify";

// theme ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;
//  theme for search bar
const StyledSearchbar = styled("div")(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up("md")]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {

  const [tickets, setTickets] = useState([]);
  const [input, setInput] = useState("");

  let navigate = useNavigate();
  const { dispatch } = useGlobalState();

  function handleOnChange(event) {
    setInput(event.target.value);
  }

  //setup onKeyUp and click to search for all the submitted tickets
  function handleSubmit(event) {
    fetchTickets();

    if (event.key === "Enter" || event.type === "click") {
      const filteredTickets = getFilteredTickets();
      dispatch({ type: "setFilteredTickets", data: filteredTickets }); //Once we found the tickets, we'll see the tickets on console
      navigate("/searchresults", { state: { input } }); // pass state value input to search results
    }
  }

  function getFilteredTickets() {
    if (!input) {
      return;
    }

    // eslint-disable-next-line array-callback-return
    let filteredTickets = tickets.filter((ticket) => {
      if (
        ticket.initialtive.includes(input) ||
        ticket.target.includes(input) ||
        ticket.author.email.includes(input)
      )
        return ticket;
    });
    return filteredTickets;
  }

  // fetch ticket from all the submitted listing tickets

  function fetchTickets() {
    getAllTickets()
      .then((tickets) => {
        setTickets(tickets);
      })
      .catch((error) => {
        console.log("Error!", error);
      })
      .finally(() => {
        console.log("Fetch completed.");
      });
  }

  // condition check-----------------------------------------
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //  ------------------------------------------------

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              onChange={handleOnChange}
              onKeyUp={handleSubmit}
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: "fontWeightBold" }}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
