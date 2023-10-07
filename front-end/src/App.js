import NavBar from "./components/Navbar";
import Main from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
