import { singInPlz, signedIn, signOutPlz, isSignedIn, auth } from "./firebase";
import Form from "./components/form";
import logo from "./logo.svg";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
// import "./App.css";

function App() {
  const [useIn, setUseIn] = useState(auth.currentUser);

  // useEffect(() => {
  //   setUseIn(isSignedIn());
  // }, []);

  const handleSignIn = () => {
    singInPlz(setUseIn);
  };

  const handleSignOut = () => {
    signOutPlz(setUseIn);
  };
  if (!useIn) {
    return (
      <div>
        <header style={style.headerStyle}>
          <Form />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/macalesterate.appspot.com/o/7hrs.jpeg?alt=media&token=4afb1c9d-99e8-4bd3-8731-dec12966a7e8"
            width={300}
          />
          <button onClick={handleSignIn}>Sign in</button>
        </header>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={handleSignOut}>Sign out</button>
        <p>Signed in</p>
      </div>
    );
  }
}

const style = {
  headerStyle: {
    color: "white",
    display: "flex",
    backgroundColor: "grey",
    flex: 1,
    flexDirection: "column",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default App;
