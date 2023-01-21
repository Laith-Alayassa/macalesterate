import React from "react";
import { auth } from "../../firebase";
import PoopCounter from "./PoopCounter";

export default function Message({ doc }) {
  const state = checkSentOrReceived(doc);
  let name = getName(doc);

  return (
    <div
      style={{
        display: state === "received" ? "flex" : "block",
        alignItems: "center",
      }}
    >
      {/* Message */}
      <div>
        <div className={`chat-name ${state}`}>
          <span>{name}</span>
        </div>
        <div className={`message ${state}`} key={doc.id}>
          <p className="chat-text">{doc.data().text}</p>
        </div>
      </div>

      {/* Counter */}
      {state === "received" && <PoopCounter doc={doc} />}
    </div>
  );
}
function getName(doc) {
  let name;
  try {
    const displayName = doc.data().userName;
    let nameArr = displayName.split(" ");
    name = `${nameArr[0]} ${nameArr[1][0]}.`;
  } catch {
    name = "Anonymous";
  }
  return name;
}

function checkSentOrReceived(doc) {
  return auth.currentUser.uid === doc.data().uid ? "sent" : "received";
}
