import React from "react";

export default function PoopCounter({ doc }) {
  // Sheesh
  const docId =
    doc._document.key.path.segments[doc._document.key.path.segments.length - 1];

  return (
    <div>
      <button className="poop-button" onClick={handOnClick}>
        💩
      </button>
      <p className="poop-counter">{doc.data().poops}</p>
    </div>
  );
}

const handOnClick = async () => {
  console.log("====================================");
  console.log("increment poop here");
  console.log("====================================");
};
