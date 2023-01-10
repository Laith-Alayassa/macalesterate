import React from "react";
import { redirect } from "react-router-dom";
import { signOutPlz } from "../../firebase";

export default function RoomsHeader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // there is no margin bottom so I did this

        paddingTop: 0,
        paddingLeft: 8,
        paddingRight: 8,
      }}
    >
      <img src={require("../../assets/camera.png")} width="20" />
      <p className="cursive">Macaleste-rate</p>
      <img
        src={require("../../assets/logout.png")}
        width="16"
        onClick={() => {
          console.log("signing out");
          signOutPlz();
          return redirect("/signIn");
        }}
      />
    </div>
  );
}
