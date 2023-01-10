import React from "react";

function Header(props) {
  const room = props.room;
  const randomInt = Math.floor(Math.random() * 7) + 1;
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
          className="circle-image"
          src={require(`../../assets/profilePics/${randomInt}.jpeg`)}
        />
        <p style={{ fontWeight: "bold", marginRight: 8 }}>{room.name}</p>
        <p>the lazy runner</p>
      </div>
    </>
  );
}

export default Header;
