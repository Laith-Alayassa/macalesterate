/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { getRooms } from "../../firebase";
import PacLoader from "../shared/PacLoader";
import Header from "./Header";
import LeaderboardButton from "./LeaderboardButton";
import Likes from "./Likes";

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

        {/* Rooms */}
        {roomsMap(roomsByScore, roomsByDate, orderByRating)}
      </>
    );
  } else {
    return <PacLoader />;
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
    borderRadius: 48,
    fontSize: 20,
    height: 40,
    width: "30%",
  },
};

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
          <p style={{ paddingLeft: 8 }}>
            <b>{room.name}</b> {room.caption}
          </p>

          {/* caption */}
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
          />
          <p style={{ paddingLeft: 8 }}>
            <b>{room.name}</b> {room.caption}
          </p>

          {/* caption */}
        </div>
      );
    });
  }
}
