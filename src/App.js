import { singInPlz, signOutPlz, getRooms, auth } from "./firebase";
import { useEffect, useState } from "react";
import SignInScreen from "./components/SignInScreen";
import { BrowserRouter as Router, Form, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import RoomsScreen from "./Screens/RoomsScreen";

import SubmitItemScreen from "./Screens/SubmitItemScreen";
function App() {
  // const [userSignedIn, setUserSignedIn] = useState(auth.currentUser);

  const [user] = useAuthState(auth);
  console.count("times here");

  const handleSignIn = () => {
    singInPlz();
  };

  const handleSignOut = () => {
    // signOutPlz(setUserSignedIn);
  };
  // console.count(userSignedIn);
  // TODO : re-render after upload
  return (
    <>
      {user ? (
        <Router>
          <Routes>
            <Route path="/" element={<RoomsScreen />} />
            <Route path="/newItem" element={<SubmitItemScreen />} />
            <Route path="/signIn" element={<p>asd</p>} />
          </Routes>
        </Router>
      ) : (
        <SignInScreen handleSignIn={handleSignIn} />
      )}
    </>
  );
}

export default App;
