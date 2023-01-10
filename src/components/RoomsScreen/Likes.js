import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getRoomInfo, updateRoomLikes } from "../../firebase";
import Ratings from "./Ratings";

function Likes(props) {
  const index = props.index;
  const [room, setRoom] = useState(props.room);
  const [dumpLike, setDumpLike] = useState(false);
  const [starLike, setStarLike] = useState(false);
  const [fireLike, setFireLike] = useState(false);
  let [user] = useAuthState(auth);

  useEffect(() => {
    styleAlreadyLiked();
  }, []);

  return (
    <div>
      {/* AI rating */}
      <Ratings room={room} />

      {/* likes */}
      <div style={styles.container}>
        <button
          className="like-button"
          id={`dumpCounterButton${index}`}
          style={styles.likeButton}
          onClick={(e) => {
            handleClick(e, "dumpCounter", dumpLike, setDumpLike, room, setRoom);
          }}
        >
          💩 {room.dumpCounter}
        </button>
        <button
          className="like-button"
          id={`starCounterButton${index}`}
          style={styles.likeButton}
          onClick={(e) =>
            handleClick(e, "starCounter", starLike, setStarLike, room, setRoom)
          }
        >
          🤩 {room.starCounter}
        </button>

        <button
          className="like-button"
          id={`fireCounterButton${index}`}
          style={styles.likeButton}
          onClick={(e) =>
            handleClick(e, "fireCounter", fireLike, setFireLike, room, setRoom)
          }
        >
          🔥 {room.fireCounter}
        </button>
      </div>
    </div>
  );

  function styleAlreadyLiked() {
    if (
      room.usersDumbLiked.hasOwnProperty(user.email) &&
      room.usersDumbLiked[user.email] === true
    ) {
      setDumpLike(true);
      document
        .getElementById(`dumpCounterButton${index}`)
        .classList.add("like-button-selected");
    }

    if (
      room.usersStarLiked.hasOwnProperty(user.email) &&
      room.usersStarLiked[user.email] === true
    ) {
      setStarLike(true);
      document
        .getElementById(`starCounterButton${index}`)
        .classList.add("like-button-selected");
    }

    if (
      room.usersFireLiked.hasOwnProperty(user.email) &&
      room.usersFireLiked[user.email] === true
    ) {
      setFireLike(true);
      document
        .getElementById(`fireCounterButton${index}`)
        .classList.add("like-button-selected");
    }
  }
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
    borderRadius: 8,
    fontSize: 20,
    height: 40,
    width: "30%",
  },
};

const handleClick = (
  elem,
  likesName,
  likeCounter,
  setLikeCOunter,
  room,
  setRoom
) => {
  const performUpvote = !likeCounter;
  performUpvote
    ? elem.target.classList.add("like-button-selected")
    : elem.target.classList.remove("like-button-selected");

  // Perform front end counter change before rendering updated one from firebase
  performUpvote ? room[likesName]++ : room[likesName]--;

  let collectionOfLikes;
  if (likesName == "dumpCounter") {
    collectionOfLikes = "usersDumbLiked";
  } else if (likesName == "starCounter") {
    collectionOfLikes = "usersStarLiked";
  } else if (likesName == "fireCounter") {
    collectionOfLikes = "usersFireLiked";
  }

  setLikeCOunter((likes) => !likes);
  updateRoomLikes(likesName, room.id, performUpvote, collectionOfLikes).then(
    () => {
      getRoomInfo(room.id).then((room) => setRoom(room));
    }
  );
};
export default Likes;
