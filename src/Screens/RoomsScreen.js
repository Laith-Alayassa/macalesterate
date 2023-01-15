import { redirect } from "react-router-dom";
import Instructions from "../components/RoomsScreen/Instructions";
import RoomsCards from "../components/RoomsScreen/RoomsCards";
import RoomsHeader from "../components/RoomsScreen/RoomsHeader";
import MyBottomNavigation from "../components/shared/MyBottomNavigation";
import { auth } from "../firebase";

function RoomsScreen() {
  if (!auth.currentUser) {
    redirect("/signIn");
  }

  // let isNewUser = checkIfNewUser();

  return (
    <div
      style={{
        backgroundColor: "#F3F6F9",
        paddingBottom: 400,
        minHeight: "100vh",
      }}
    >
      <RoomsHeader />

      {/* LOGO */}
      {/* <img
        src={require("../assets/logo.png")}
        width="100%"
        alt="logo"
        style={{ borderRadius: 8 }}
      /> */}

      {/* Instructions */}
      <Instructions />

      <RoomsCards />
      <MyBottomNavigation />

      {/* <FloatingActionButton /> */}
    </div>
  );

  function checkIfNewUser() {
    const metadata = auth.currentUser.metadata;
    return metadata.creationTime == metadata.lastSignInTime ? true : false;
  }
}

export default RoomsScreen;
