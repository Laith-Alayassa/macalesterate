import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
function FloatingActionButton() {
  return (
    <div className="floating-button">
      <a href="/newitem" style={{ color: "white" }}>
        <Fab color="info" aria-label="add">
          <AddIcon />
        </Fab>
      </a>
    </div>
  );
}

export default FloatingActionButton;
