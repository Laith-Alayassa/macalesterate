import React from "react";

export default function Ratings({ room, ranking }) {
  let displayedRank;

  if (ranking === 1) {
    displayedRank = "๐ฅ #1  ๐ฅ";
  } else if (ranking === 2) {
    displayedRank = "๐ฅ #2  ๐ฅ";
  } else if (ranking === 3) {
    displayedRank = "๐ฅ #3  ๐ฅ";
  } else {
    displayedRank = `๐จโ๐ฉโ๐งโ๐ฆ Mac Rating: #${ranking}`;
  }
  return (
    <div style={{ display: "flex", flexDirection: "row", height: 80 }}>
      <div className="ai-rating">๐ค AI Rating : {room.aiRating}</div>
      <div className="community-rating">{displayedRank}</div>
    </div>
  );
}
