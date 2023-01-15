import React from "react";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { addComment } from "../../firebase";
export default function CommentButton(props) {
  const roomId = props.roomId;

  return (
    <form
      className="comment-button"
      style={{ backgroundColor: "white", padding: 0 }}
      onSubmit={(e) => {
        e.preventDefault();
        if (!e.target[0].value) return;
        const comment = e.target[0].value;
        addComment(comment, roomId);
        e.target.reset();

        document.getElementById("comment-confirmation").style.top = "10px";
        setTimeout(() => {
          document.getElementById("comment-confirmation").style.top = "-200px";
        }, 2500);
      }}
    >
      <div
        style={{
          flex: 7,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
          height: 50,
          paddingLeft: 16,
        }}
      >
        <input
          style={{ width: "100%", paddingLeft: 8, paddingRight: 16 }}
          type="text"
          maxLength={120}
          placeholder="Leave a comment..."
        />
      </div>
      <button type="submit" className="submit-comment-button">
        <AddCommentIcon
          fontSize="large"
          color="secondary"
          style={{ flex: 1, paddingRight: 16, paddingLeft: 16, paddingTop: 8 }}
        />
      </button>
    </form>
  );
}
