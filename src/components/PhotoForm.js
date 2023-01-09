import React, { useState } from "react";
import { uploadPhoto } from "../firebase";

// import "./styles.css";
function PhotoForm() {
  const [firstName, setFirstName] = useState("");
  const [imageHolder, setImageHolder] = useState(null);
  return (
    <form
      enctype="multipart/form-data"
      onSubmit={(event) => {
        event.preventDefault();
        uploadPhoto(imageHolder, firstName);
      }}
    >
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First name"
        type="text"
        name="firstName"
        required
      />
      <input type="file" onChange={(e) => setImageHolder(e.target.files[0])} />
      <button type="submit">Submit</button>
    </form>
  );
}
export default PhotoForm;
