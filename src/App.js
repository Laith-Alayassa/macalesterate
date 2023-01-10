import { singInPlz, auth } from "./firebase";
import SignInScreen from "./components/SignInScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import RoomsScreen from "./Screens/RoomsScreen";
import SubmitItemScreen from "./Screens/SubmitItemScreen";

// TODO : create leader board page
function App() {
  const [user] = useAuthState(auth);
  const handleSignIn = () => {
    singInPlz();
  };

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
