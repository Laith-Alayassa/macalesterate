import React from "react";
import { redirect } from "react-router-dom";
import PhotoForm from "../components/PhotoForm";
import { auth } from "../firebase";

export default function SubmitItemScreen() {
  if (!auth.currentUser) {
    redirect("/signIn");
  }
  return (
    <div>
      <PhotoForm />
      <img
        src="https://firebasestorage.googleapis.com/v0/b/macalesterate.appspot.com/o/7hrs.jpeg?alt=media&token=4afb1c9d-99e8-4bd3-8731-dec12966a7e8"
        width={300}
      />
    </div>
  );
}
