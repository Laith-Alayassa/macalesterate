import React from "react";

export default function Ratings({ room, ranking }) {
  let displayedRank;

  if (ranking === 1) {
    displayedRank = "🥇 #1  🥇";
  } else if (ranking === 2) {
    displayedRank = "🥈 #2  🥈";
  } else if (ranking === 3) {
    displayedRank = "🥉 #3  🥉";
  } else {
    displayedRank = `👨‍👩‍👧‍👦 Community Ranking : ${ranking}`;
  }
  return (
    <>
      <div className="ai-rating">🤖 AI Rating : {room.aiRating}</div>
      <div style={styles.container}>
        <div className="community-rating">{displayedRank}</div>
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
