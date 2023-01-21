import { collection, query, limit, orderBy, addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import PacLoader from "../components/shared/PacLoader";
import { auth, db } from "../firebase";
import RoomsHeader from "../components/RoomsScreen/RoomsHeader";
import Message from "../components/ChatRoom/Message";
const Filter = require("bad-words");
const filter = new Filter();

export default function ChatRoom() {
  // Scroll to bottom of page
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, 1000);

  const q = query(
    collection(db, "messages"),
    orderBy("createdAt", "desc"),
    limit(25)
  );

  const [value, loading, error] = useCollection(q);

  return (
    <div style={{ overflowX: "hidden" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "white",
        }}
      >
        <RoomsHeader />
      </div>
      <div
        style={{
          paddingTop: 58,
          paddingBottom: 88,
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        {error && <strong>Error (╯°□°)╯︵ ┻━┻ </strong>}
        {loading && <PacLoader />}
        {value && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: 24, padding: 0, margin: 0, height: 10 }}>
                .
              </span>
              <span style={{ fontSize: 24, padding: 0, margin: 0, height: 10 }}>
                .
              </span>
              <span style={{ fontSize: 24, padding: 0, margin: 0, height: 10 }}>
                .
              </span>
            </div>
            <span>
              {value.docs
                .slice(0)
                .reverse()
                .map((doc) => (
                  <Message key={doc.id} doc={doc} />
                ))}
            </span>
          </>
        )}
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input className="chat-input" type="text" />
        <button className="send-message-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

const handleSubmit = async (e) => {
  e.preventDefault();
  // checks if length of message is 0
  if (!e.target.elements[0].value) return;
  const message = filter.clean(e.target.elements[0].value);

  await addDoc(collection(db, "messages"), {
    text: message,
    uid: auth.currentUser.uid,
    createdAt: new Date(),
    userName: auth.currentUser.displayName,
    poops: 0,
    usersPooped: [],
  });

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
  e.target.reset();
};
