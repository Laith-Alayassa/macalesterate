import React from "react";

function Likes(props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <button
          className="like-button"
          style={{
            backgroundColor: "rgba(217, 217, 217, 0.47)",
            borderWidth: 0,
            borderRadius: 48,
            fontSize: 20,
            height: 40,
            width: "30%",
          }}
          onClick={() => {
            console.log("clicked");
          }}
        >
          💩 142
        </button>
        <button
          className="like-button"
          style={{
            backgroundColor: "rgba(217, 217, 217, 0.47)",
            borderWidth: 0,
            borderRadius: 48,
            fontSize: 20,
            height: 40,
            width: "30%",
          }}
          onClick={() => {
            console.log("clicked");
          }}
        >
          🤩 16
        </button>
        <button
          className="like-button"
          style={{
            backgroundColor: "rgba(217, 217, 217, 0.47)",
            borderWidth: 0,
            borderRadius: 48,
            fontSize: 20,
            height: 40,
            width: "30%",
          }}
          onClick={() => {
            console.log("clicked");
          }}
        >
          ❤️ 3
        </button>
      </div>
    </>
  );
}

export default Likes;
