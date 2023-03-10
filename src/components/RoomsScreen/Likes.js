import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getRoomInfo, updateRoomLikes } from "../../firebase";
import Ratings from "./Ratings";
import ConfettiExplosion from "confetti-explosion-react";

const tinyExplodeProps = {
  force: 0.8,
  duration: 3000,
  particleCount: 10,
  height: 500,
  width: 500,
};

function Likes(props) {
  const [isExplodingDumb, setIsExplodingDumb] = useState(false);
  const [isExplodingStar, setIsExplodingStar] = useState(false);
  const [isExplodingFire, setIsExplodingFire] = useState(false);
  const index = props.index;
  const ranking = props.ranking;

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
      <Ratings room={room} ranking={ranking} />

      {/* // TODO: make this its own component and place the use State inside it to reduce  re-renders  */}
      {/* likes */}
      <div style={styles.container}>
        <button
          className="like-button"
          id={`dumpCounterButton${index}`}
          style={styles.likeButton}
          onClick={(e) => {
            handleClick(e, "dumpCounter", dumpLike, setDumpLike, room, setRoom);
            setIsExplodingDumb(!dumpLike);
            setTimeout(() => setIsExplodingDumb(false), 1800);
          }}
        >
          {isExplodingDumb && (
            <div>
              <ConfettiExplosion {...tinyExplodeProps} />
            </div>
          )}
          💩 {room.dumpCounter}
        </button>
        <button
          className="like-button"
          id={`starCounterButton${index}`}
          style={styles.likeButton}
          onClick={(e) => {
            handleClick(e, "starCounter", starLike, setStarLike, room, setRoom);
            setIsExplodingStar(!starLike);
            setTimeout(() => setIsExplodingStar(false), 1800);
          }}
        >
          {isExplodingStar && (
            <div>
              <ConfettiExplosion {...tinyExplodeProps} />
            </div>
          )}
          🤩 {room.starCounter}
        </button>

        <button
          className="like-button"
          id={`fireCounterButton${index}`}
          style={styles.likeButton}
          onClick={(e) => {
            handleClick(e, "fireCounter", fireLike, setFireLike, room, setRoom);
            setIsExplodingFire(!fireLike);
            setTimeout(() => setIsExplodingFire(false), 1800);
          }}
        >
          {isExplodingFire && (
            <div>
              <ConfettiExplosion {...tinyExplodeProps} />
            </div>
          )}
          🔥 {room.fireCounter}
        </button>
      </div>

      {/* slider */}
      {/* // TODO: activate slider */}
      {/* <RatingSlider /> */}
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
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
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
  if (likesName === "dumpCounter") {
    collectionOfLikes = "usersDumbLiked";
  } else if (likesName === "starCounter") {
    collectionOfLikes = "usersStarLiked";
  } else if (likesName === "fireCounter") {
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
