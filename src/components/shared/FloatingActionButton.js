import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
function FloatingActionButton() {
  return (
    <div className="floating-button">
      {/* asds */}
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}

export default FloatingActionButton;
