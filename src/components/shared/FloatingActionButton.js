import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { redirect } from "react-router-dom";
function FloatingActionButton() {
  return (
    <div className="floating-button">
      <a href="/newitem" style={{ color: "white" }}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </a>
    </div>
  );
}

export default FloatingActionButton;
