import { auth, updatePoopCounter } from "../../firebase";

export default function PoopCounter({ doc: messageDoc }) {
  const docId = getDocId(messageDoc);

  const handOnClick = () => {
    const newPoop = currentUserPoopedMessage(messageDoc) ? false : true;
    updatePoopCounter(docId, newPoop);
  };

  return (
    <div>
      <button className="poop-button" onClick={handOnClick}>
        💩
      </button>
      <p className="poop-counter">{messageDoc.data().poopCounter}</p>
    </div>
  );
}

function currentUserPoopedMessage(messageDoc) {
  return messageDoc.data().usersPooped.includes(auth.currentUser.email);
}

function getDocId(doc) {
  return doc._document.key.path.segments[
    doc._document.key.path.segments.length - 1
  ];
}
