import { singInPlz, auth } from "./firebase";
import SignInScreen from "./components/SignInScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import RoomsScreen from "./Screens/RoomsScreen";
import SubmitItemScreen from "./Screens/SubmitItemScreen";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        <Router>
          <Routes>
            <Route path="/" element={<RoomsScreen />} />
            <Route path="/newItem" element={<SubmitItemScreen />} />
            <Route path="/signIn" element={<p>a</p>} />
          </Routes>
        </Router>
      ) : (
        <SignInScreen />
      )}
    </>
  );
}

export default App;
