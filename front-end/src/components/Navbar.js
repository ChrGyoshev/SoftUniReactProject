import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { HideNavBar } from "../assets/js/HideNavbar";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { profileHandler } from "../assets/js/DropDownBtns";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const liRef = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        console.log(user);

        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handlerDropDownBtns = () => {
    profileHandler(liRef);
  };

  const LogOut = () => {
    signOut(auth)
      .then((data) => {
        navigate("sign-in");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <nav>
        <div className="allMenu ">
          <ul className="ul">
            <Link to="/">
              <li className="lia">
                <span className="li">Home</span>
              </li>
            </Link>
            <li className="lia">
              <a className="li">Catalogue</a>
            </li>
            <Link to="/sign-up">
              <li className="lia">
                <span className="li">Sign Up</span>
              </li>
            </Link>
            <Link to="/sign-in">
              <li className="lia">
                <span className="li">Sign In</span>
              </li>
            </Link>

            {user ? (
              <li className="lia" onClick={handlerDropDownBtns} ref={liRef}>
                <span className="li">Profile</span>
                <span className="profile-btns">SignIn</span>
                <span className="profile-btns">LogIn</span>
              </li>
            ) : null}

            <Link to="/about">
              <li className="lia">
                <span className="li">About</span>
              </li>
            </Link>

            {user ? (
              <li className="lia" onClick={LogOut}>
                <span className="li">Logout</span>
              </li>
            ) : null}
          </ul>
          <div className="Menu2">
            <svg
              version="1.1"
              id="menulogo"
              x="0px"
              y="0px"
              width="40px"
              height="36px"
              viewBox="0 0 40 36"
              onClick={HideNavBar}
            >
              <rect
                className="rect1"
                fill="#FFF"
                width="40"
                height="5.392"
              ></rect>
              <rect
                className="rect2"
                x="0"
                y="12"
                fill="#FFF"
                width="40"
                height="5.393"
              ></rect>
              <rect
                className="rect3"
                x="0"
                y="24"
                fill="#FFF"
                width="40"
                height="5.393"
              ></rect>
            </svg>
            <div className="Menu hover"></div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
