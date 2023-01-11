import React from "react";

export default function LeaderboardButton({ setOrderByRating, orderByRating }) {
  return (
    <button
      id="leaderboard"
      className="leaderboard-inactive wiggle"
      onClick={(e) => {
        setOrderByRating(!orderByRating);
        e.target.classList.toggle("leaderboard-active");
      }}
    >
      🏆 Leaderboard Mode : {orderByRating ? "ACTIVE  " : "INACTIVE"}
    </button>
  );
}
