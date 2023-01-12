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
    displayedRank = `#${ranking}`;
  }
  return (
    <div style={{ display: "flex", flexDirection: "row", height: 80 }}>
      <div className="ai-rating">
        <div style={{ margin: 0, padding: 0 }}>🤖 AI Rating :</div>
        <div style={{ margin: 0, padding: 0 }}>{room.aiRating}</div>
      </div>
      <div className="community-rating">
        <div style={{ margin: 0, padding: 0 }}>👨‍👩‍👧‍👦 Mac Rating: </div>
        <div style={{ margin: 0, padding: 0 }}>{displayedRank}</div>
      </div>
    </div>
  );
}
