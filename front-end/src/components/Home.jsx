import logo from "../assets/pictures/logo.png";
import { useEffect } from "react";

const App = () => {
  return (
    <div className="image-container">
      <h1 className="site-slogan">
        From our site to your book nook, stories that will hook
      </h1>

      <div className="image1">
        <img src={logo} alt="Your Picture" />
      </div>
    </div>
  );
};

export default App;
