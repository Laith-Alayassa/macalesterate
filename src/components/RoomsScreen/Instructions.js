import React from "react";

export default function Instructions() {
  return (
    <div className="instructions">
      <div style={{ fontSize: 24 }}>Welcome to Macaleste-rate</div>
      <div style={{ fontSize: 80, margin: 24 }}>🥳</div>
      <div style={{ marginBottom: 16 }}>
        View and rank rooms from the Mac community
      </div>
      <div style={{ marginBottom: 16 }}>
        Upload your own using the + button below
      </div>
      <div
        style={{
          marginBottom: 8,
          paddingLeft: 8,
          paddingRight: 8,
          textAlign: "center",
        }}
      >
        You can post images with a nick name. comments will have your first name
        and second initial
      </div>
    </div>
  );
}
