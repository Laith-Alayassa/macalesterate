import { redirect } from "react-router-dom";
import RoomsCards from "../components/RoomsScreen/RoomsCards";
import RoomsHeader from "../components/RoomsScreen/RoomsHeader";
import FloatingActionButton from "../components/shared/FloatingActionButton";
import { auth } from "../firebase";

function RoomsScreen() {
  // if (!auth.currentUser) {
  //   redirect("/signIn");
  // }

  return (
    <div
      style={{
        backgroundColor: "#F3F6F9",
        paddingBottom: 400,
        minHeight: "100vh",
      }}
    >
      <RoomsHeader />
      <RoomsCards />
      <FloatingActionButton />
    </div>
  );
}

export default RoomsScreen;
