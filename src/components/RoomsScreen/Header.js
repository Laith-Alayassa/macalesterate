import React from "react";

function Header(props) {
  const room = props.room;
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img
          src={room.url}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            marginRight: 8,
          }}
        />
        <p style={{ fontWeight: "bold", marginRight: 8 }}>Cozy room</p>
        <p>the lazy runner</p>
      </div>
    </>
  );
}

export default Header;
