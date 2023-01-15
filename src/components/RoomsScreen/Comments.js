import React from "react";

export default function Comments({ room }) {
  return room.comments.map((comment, i) => {
    return (
      <p key={i} style={{ paddingLeft: 8 }}>
        <b>{comment.name}</b> {comment.comment}
      </p>
    );
  });
}
