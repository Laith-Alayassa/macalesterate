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
  const [rooms, setRooms] = useState(false);
  const [user] = useAuthState(auth);
  console.count("times here");
  useEffect(() => {
    let newRooms;
    getRooms().then((wow) => {
      newRooms = wow;
      setRooms(newRooms);
    });
  }, []);

  const handleSignIn = () => {
    singInPlz();
  };

  const handleSignOut = () => {
    // signOutPlz(setUserSignedIn);
  };
  // console.count(userSignedIn);

  return (
    <>
      {user ? (
        <Router>
          <Routes>
            <Route path="/" element={rooms && <RoomsScreen rooms={rooms} />} />
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
