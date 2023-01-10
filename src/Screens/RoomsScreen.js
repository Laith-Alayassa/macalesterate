import React from "react";
import { useParams, redirect } from "react-router-dom";
import RoomsCards from "../components/RoomsScreen/RoomsCards";
import RoomsHeader from "../components/RoomsScreen/RoomsHeader";
import FloatingActionButton from "../components/shared/FloatingActionButton";
import { auth, signOutPlz } from "../firebase";

function RoomsScreen(props) {
  let params = useParams();

  const id = params.id;
  const rooms = props.rooms;
  const key = props.key;
  if (!auth.currentUser) {
    redirect("/signIn");
  }

  return (
    <div style={{ backgroundColor: "#F3F6F9", paddingBottom: 400 }}>
      <RoomsHeader />
      <RoomsCards rooms={rooms} />
      <FloatingActionButton />
    </div>
  );
}

export default RoomsScreen;
