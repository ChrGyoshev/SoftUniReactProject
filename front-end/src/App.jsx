import NavBar from "./components/Navbar";
import Main from "./components/Home";
import About from "./components/About";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ProfileDetails from "./components/ProfileDetails";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="profile-details" element={<ProfileDetails />} />
      </Routes>
    </>
  );
}

export default App;
