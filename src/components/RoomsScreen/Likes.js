import React, { useState } from "react";
import { getRoomInfo, updateRoomLikes } from "../../firebase";

function Likes(props) {
  // const [updateHappened, setUpdateHappened] = useState(false);
  const [room, setRoom] = useState(props.room);

  return (
    <div>
      <div style={styles.container}>
        <button
          className="like-button"
          style={styles.likeButton}
          onClick={() => {
            console.log(room.id);
            updateRoomLikes("dumpCounter", room.id).then(() => {
              getRoomInfo(room.id).then((room) => setRoom(room));
            });
          }}
        >
          💩 {room.dumpCounter}
        </button>
        <button
          className="like-button"
          style={styles.likeButton}
          onClick={() => {
            console.log("clicked");
          }}
        >
          🤩 {room.starCounter}
        </button>
        <button
          className="like-button"
          style={styles.likeButton}
          onClick={() => {
            console.log("clicked");
          }}
        >
          🔥 {room.fireCounter}
        </button>
      </div>
      <div style={styles.container}>
        <button
          className="like-button"
          style={styles.likeButton}
          onClick={() => {
            console.log("clicked");
          }}
        >
          😷 {room.dumpCounter}
        </button>
        <button
          className="like-button"
          style={styles.likeButton}
          onClick={() => {
            console.log("clicked");
          }}
        >
          💍 {room.starCounter}
        </button>
        <button
          className="like-button"
          style={styles.likeButton}
          onClick={() => {
            console.log("clicked");
          }}
        >
          🐸 {room.fireCounter}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 8,
  },
  likeButton: {
    backgroundColor: "rgba(217, 217, 217, 0.47)",
    borderWidth: 0,
    borderRadius: 48,
    fontSize: 20,
    height: 40,
    width: "30%",
  },
};
export default Likes;
