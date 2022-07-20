import React from "react";
import "./Navbar.css";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
const Navbar = () => {
  return (
    <div className="navbar">
      <IconButton>
        <PersonIcon fontSize="large" className="navbar__icon" />
      </IconButton>
    </div>
  );
};

export default Navbar;
