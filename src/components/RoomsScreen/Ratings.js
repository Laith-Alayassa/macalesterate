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
    displayedRank = `👨‍👩‍👧‍👦 Mac Rating: #${ranking}`;
  }
  return (
    <div style={{ display: "flex", flexDirection: "row", height: 80 }}>
      <div className="ai-rating">🤖 AI Rating : {room.aiRating}</div>
      <div className="community-rating">{displayedRank}</div>
    </div>
  );
}
