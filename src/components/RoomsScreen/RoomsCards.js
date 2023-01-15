/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { getRooms } from "../../firebase";
import PacLoader from "../shared/PacLoader";
import Header from "./Header";
import LeaderboardButton from "./LeaderboardButton";
import Likes from "./Likes";
import CommentButton from "./CommentButton";
import CommentConfirmation from "./CommentConfirmation";
import Comments from "./Comments";
export default function RoomsCards() {
  const [orderByRating, setOrderByRating] = useState(false);
  const [roomsByDate, setRoomsByDate] = useState(false);
  const [roomsByScore, setRoomsByScore] = useState(false);
  useEffect(() => {
    getRooms().then((roomsGroups) => {
      setRoomsByDate(roomsGroups[0]);
      setRoomsByScore(roomsGroups[1]);
    });
  }, [orderByRating]);

  if (roomsByScore) {
    return (
      <>
        {/* Leaderboard */}
        <LeaderboardButton
          setOrderByRating={setOrderByRating}
          orderByRating={orderByRating}
        />
        <CommentConfirmation />
        {/* Rooms */}
        {roomsMap(roomsByScore, roomsByDate, orderByRating)}
      </>
    );
  } else {
    return <PacLoader />;
  }
}
function roomsMap(roomsByScore, roomsByDate, orderByRating) {
  if (orderByRating) {
    return roomsByScore.map((room, ranking) => {
      const i = `${Math.floor(Math.random() * 100)}${room.id}${Math.floor(
        Math.random() * 100
      )}`;
      return (
        <div key={i} style={{ marginLeft: 16, marginRight: 16 }}>
          <hr style={{ opacity: "30%", padding: 0, marginBottom: 16 }} />
          <Header room={room} />
          <img
            src={room.url}
            style={{
              marginTop: 16,
              maxWidth: "100%",
              borderRadius: 8,
              boxShadow: "0 3px 10px 0 rgba(0,10,0,0.3)",
            }}
          />
          <Likes
            room={room}
            index={i}
            ranking={orderByRating ? ranking + 1 : "👀"}
          />
          <CommentButton roomId={room.id} />
          {/* comments */}
          <Comments room={room} />
        </div>
      );
    });
  } else {
    return roomsByDate.map((room, ranking) => {
      const i = `${Math.floor(Math.random() * 100)}${room.id}${Math.floor(
        Math.random() * 100
      )}`;
      return (
        <div key={i} style={{ marginLeft: 16, marginRight: 16 }}>
          <hr style={{ opacity: "30%", padding: 0, marginBottom: 16 }} />
          <Header room={room} />
          <img
            src={room.url}
            style={{
              marginTop: 16,
              maxWidth: "100%",
              borderRadius: 8,
              boxShadow: "0 3px 10px 0 rgba(0,10,0,0.3)",
            }}
          />
          <Likes
            room={room}
            index={i}
            ranking={orderByRating ? ranking + 1 : "👀"}
          />{" "}
          <CommentButton roomId={room.id} />
          {/* comments */}
          <Comments room={room} />
        </div>
      );
    });
  }
}
