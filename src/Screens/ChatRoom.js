import { query, limit, orderBy, setDoc, doc, addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import PacLoader from "../components/shared/PacLoader";
import { auth, db } from "../firebase";
import RoomsHeader from "../components/RoomsScreen/RoomsHeader";
export default function ChatRoom() {
  const q = query(
    collection(db, "messages"),
    orderBy("createdAt", "asc"),
    limit(25)
  );
  const [value, loading, error] = useCollection(q);

  return (
    <div>
      <RoomsHeader />
      {error && <strong>Error (╯°□°)╯︵ ┻━┻ </strong>}
      {loading && <PacLoader />}
      {value && (
        <span>
          {value.docs.map((doc) => (
            <Message key={doc.id} doc={doc} />
          ))}
        </span>
      )}

      <form
        className="chat-form"
        onSubmit={async (e) => {
          e.preventDefault();
          const message = e.target.elements[0].value;
          await addDoc(collection(db, "messages"), {
            text: message,
            uid: auth.currentUser.uid,
            createdAt: new Date(),
          });
          e.target.reset();
        }}
      >
        <input className="chat-input" type="text" />
        <button className="send-message-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

function Message({ doc }) {
  const state = auth.currentUser.uid === doc.data().uid ? "sent" : "received";
  return (
    <div className={`message ${state}`} key={doc.id}>
      <p className="chat-text">{doc.data().text}</p>
    </div>
  );
}
