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
        {/* // Images from https://dicebear.com/ which is totally awesome */}
        <img className="circle-image" src={room.avatarURL} />
        <p
          className="shadow-text"
          style={{
            fontWeight: "bold",
            marginLeft: 8,
            marginRight: 8,
          }}
        >
          {room.name}
        </p>
      </div>
    </>
  );
}

export default Header;
