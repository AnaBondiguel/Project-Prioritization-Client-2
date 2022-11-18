import React, { useState, useEffect } from "react";
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
// utils
import { bgBlur } from "../../@mui/cssStyles";
import Iconify from "../../@mui/components/iconify";
// component
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

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
  // ----------------------------------------------------------------------
  let initialData = {
    userInput: "",
  };

  const [data, setData] = useState(initialData);
  let navigate = useNavigate();
  const { store, dispatch } = useGlobalState();

  function handleOnChange(event) {
    setData({
      ...data,
      userInput: event.target.value,
    });
    // console.log(event.target.value);
  }

  //setup onKeyUp to search for all the submitted tickets
  function handleSubmit(event) {
    if (event.key === "Enter") {
      const filteredTickets = getFilteredTickets();
      console.log("filterticket", filteredTickets);
      dispatch({ type: "setFilteredTickets", data: filteredTickets });
      //Once we found the tickets, we'll see the tickets on the search results page
      navigate("/searchresults");
    }
  }

  function getFilteredTickets() {
    if (!data.userInput) {
      return data.tickets;
    }
    let filteredTickets = data.tickets.filter((ticket) => {
      if (
        ticket.initialtive.includes(data.userInput) ||
        ticket.target.includes(data.userInput)
      )
        return ticket;
    });
    return filteredTickets;
  }

  // console.log(data.tickets);
  // fetch ticket from all the submitted listing tickets
  useEffect(
    () => {
      function fetchTickets() {
        getAllTickets()
          .then((tickets) => {
            // console.log("insearch", tickets);
            setData({
              ...data,
              tickets: tickets,
            });
          })
          .catch((error) => {
            console.log("Error!", error);
          })
          .finally(() => {
            console.log("Fetch completed.");
          });
      }
      fetchTickets();
    },
    // only run on component did mount
    []
  );

  // -----------------------------------------
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              // startAdornment={
              //   <InputAdornment position="start">
              //     <Iconify
              //       icon="eva:search-fill"
              //       sx={{ color: "text.disabled", width: 20, height: 20 }}
              //     />
              //   </InputAdornment>
              // }
              sx={{ mr: 1, fontWeight: "fontWeightBold" }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
            >
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
