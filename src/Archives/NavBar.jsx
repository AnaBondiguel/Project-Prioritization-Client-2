import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Grid from '@mui/material/Grid';

function NavBar(props) {
  const { title, sections } = props;
  return (
   
    <>
     
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
           <NavLink to="/">{title}</NavLink>
        </Typography>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
       <Grid container columnSpacing={{ xs: 3, sm: 4, md: 5 }} justifyContent="center" alignItems="center">
        {sections.map((section) => (
          <Grid item key={section.title}><NavLink key={section.title} to={section.url}>{section.title}</NavLink></Grid> 
        ))}
       </Grid>
      </Toolbar>
      
    </>
    
  );
}

export default NavBar;
