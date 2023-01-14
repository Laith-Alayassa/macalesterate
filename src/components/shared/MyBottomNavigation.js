import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import InfoIcon from "@mui/icons-material/Info";

export default function MyBottomNavigation() {
  return (
    <div className="bottom-bar">
      <BottomNavigation style={{ paddingBottom: 6, paddingTop: 6 }} showLabels>
        <BottomNavigationAction
          label="Favorites"
          icon={
            <a href="/">
              <InfoIcon color="secondary" />
            </a>
          }
        />
        <BottomNavigationAction
          label="Create Post"
          icon={
            <a href="/newitem">
              <AddCircleIcon color="primary" fontSize="large" />
            </a>
          }
        />
        <BottomNavigationAction
          label="Live Chat"
          icon={
            <a href="/chat">
              <MarkUnreadChatAltIcon color="secondary" />
            </a>
          }
        />
      </BottomNavigation>
    </div>
  );
}
