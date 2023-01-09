import React from "react";
import { redirect } from "react-router-dom";
import PhotoForm from "../components/PhotoForm";
import Header from "../components/shared/Header";

import { auth } from "../firebase";

export default function SubmitItemScreen() {
  if (!auth.currentUser) {
    redirect("/signIn");
  }

  return (
    <div style={{ backgroundColor: "#F3F6F9", height: "100vh", margin: 0 }}>
      <Header />
      <PhotoForm />
    </div>
  );
}
