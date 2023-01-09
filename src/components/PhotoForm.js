import { Label } from "@mui/icons-material";
import { style } from "@mui/system";
import React, { useState } from "react";
import { redirect } from "react-router-dom";
import { uploadPhoto } from "../firebase";
import Header from "./RoomsScreen/Header";

// import "./styles.css";
function PhotoForm() {
  const [nickName, setNickName] = useState("");
  const [building, setBuilding] = useState("cafe mac");
  const [imageHolder, setImageHolder] = useState(null);
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 8,
      }}
      enctype="multipart/form-data"
      onSubmit={(event) => {
        event.preventDefault();
        uploadPhoto(imageHolder, nickName);
        redirect("/");
      }}
    >
      <h2 style={{ marginTop: 0 }}>Your Room 🤣</h2>

      <input
        style={{
          backgroundColor: "white",
          height: 50,
          padding: 8,
          width: "90%",
          borderTop: "0px",
          borderRadius: 16,
          border: "none",
          marginBottom: 32,
        }}
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
        placeholder="Nickname: e.g. cafe mac"
        type="text"
        name="firstName"
        required
      />
      <select
        style={{
          backgroundColor: "white",
          height: 50,
          padding: 8,
          width: "90%",
          borderTop: "0px",
          borderRadius: 16,
          border: "none",
          marginBottom: 32,
        }}
        name="select"
        onChange={(e) => setBuilding(e.target.value)}
      >
        <option value="Turck">Turck</option>
        <option value="Doty">Doty</option>
        <option value="Dupre">Dupre (auto 💩)</option>
        <option value="GDD">GDD</option>
        <option value="Bigelow">Bigelow</option>
        <option value="Wallace">Wallace</option>
        <option value="Language Houses">Language</option>
      </select>

      <h3>Upload Image</h3>
      <input
        required
        style={{
          backgroundColor: "white",
          height: 50,
          padding: 8,
          width: "90%",
          borderTop: "0px",
          borderRadius: 16,
          border: "none",
          marginBottom: 32,
        }}
        type="file"
        onChange={(e) => setImageHolder(e.target.files[0])}
      />
      <input type="submit" value="Submit" required />
    </form>
  );
}
export default PhotoForm;
