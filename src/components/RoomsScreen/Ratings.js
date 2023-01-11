import React from "react";

export default function Ratings({ room, ranking }) {
  return (
    <>
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
          marginTop: 16,
        }}
      >
        🤖 AI Rating : {room.aiRating}
      </div>
      <div style={styles.container}>
        <div
          className="community-rating"
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
            marginBottom: 8,
          }}
        >
          👨‍👩‍👧‍👦 Community Ranking : {ranking}
        </div>
      </div>
    </>
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
};
