import React from "react";
import Header from "./Header";
import Likes from "./Likes";

export default function RoomsCards(params) {
  const rooms = params.rooms;
  return (
    <>
      {rooms.map((room) => {
        return (
          <div style={{ marginLeft: 16, marginRight: 16 }}>
            <hr style={{ opacity: "30%" }} />

            {/* AI rating */}
            <div
              className="ai-rating"
              style={{
                backgroundColor: "rgba(217, 217, 217, 0.47)",
                borderWidth: 0,
                borderRadius: 8,
                fontSize: 20,
                height: 40,
                display: "flex",
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              🤖 AI Rating : 💩
            </div>
            <Header room={room} />

            <img
              src={room.url}
              style={{
                marginTop: 8,
                maxWidth: "100%",
                borderRadius: 8,
                boxShadow: "0 0 10px 0 rgba(0,10,0,0.2)",
              }}
            />

            <Likes />

            {/* caption */}
            <p>
              <b>Shawerma</b> the room where I started my open source project
            </p>
          </div>
        );
      })}
    </>
  );
}
