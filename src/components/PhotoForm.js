import { useState } from "react";
import { uploadPhoto } from "../firebase";
import { Navigate } from "react-router-dom";
import PacLoader from "./shared/PacLoader";

function PhotoForm() {
  const [nickName, setNickName] = useState("");
  const [caption, setCaption] = useState("");
  const [building, setBuilding] = useState("cafe mac");
  const [imageHolder, setImageHolder] = useState(null);
  const [goToHome, setGoToHome] = useState(false);
  const [loading, setLoading] = useState(false);

  if (goToHome) {
    return <Navigate to="/" />;
  }

  if (!loading) {
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
          setLoading(true);
          uploadPhoto(imageHolder, nickName, caption, building)
            .then(() => {
              // navigate("/");
              setGoToHome(true);
            })
            .catch(() => {
              alert("🙅‍♂️ No bad words allowed 🙅‍♂️");
              setLoading(false);
            });
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
          pattern="/^[a-zA-Z]+$/g"
          title="No special characters allowed"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          placeholder="Nickname: e.g. cafe mac"
          type="text"
          name="firstName"
          maxLength={12}
          required
        />
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
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="short caption"
          type="text"
          name="caption"
          maxLength={100}
          required
        />

        {/* <label>Building</label> */}
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

        <h3>{imageHolder ? "file chosen successfully 👍" : "Upload Image"}</h3>
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
          accept="image/*"
          onChange={(e) => {
            setImageHolder(e.target.files[0]);
            e.target.classList.add("file-selected");
          }}
        />
        <input type="submit" value="Submit" required />
      </form>
    );
  } else {
    return <PacLoader />;
  }
}
export default PhotoForm;
