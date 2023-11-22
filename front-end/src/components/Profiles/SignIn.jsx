import React, { useRef, useState } from "react";
import ShowPassword from "../../assets/js/PasswordHide";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import GoogleButton from "react-google-button";
import useClickOutside from "../hooks/useClickOutside";

function YourComponent() {
  const inputOne = useRef(null);
  const iconOne = useRef(null);
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const errorBoxRef = useRef(null);
  const remmemberMeRef = useRef(null);

  const handleClick = (...clickedRef) => {
    const [input, ico] = clickedRef;
    ShowPassword(input, ico);
  };

  const Submitting = (e) => {
    e.preventDefault();
    const browserPersistence = remmemberMeRef.current.checked
      ? browserLocalPersistence
      : browserSessionPersistence;
    setPersistence(auth, browserPersistence).then(function () {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredidential) => {
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
          if (error.code === "auth/invalid-email") {
            setErrors((prevErrors) => [...prevErrors, "Invalid email"]);
          } else if (error.code === "auth/missing-password") {
            setErrors((prevData) => [...prevData, "Missing password"]);
          } else if (error.code === "auth/invalid-login-credentials") {
            setErrors((prevData) => [
              ...prevData,
              "Email/Password doesnt match",
            ]);
          } else if (error.code === "auth/too-many-requests") {
            setErrors((prevErrors) => [
              ...prevErrors,
              "Too many requests. PLease try again later",
            ]);
          } else {
            setErrors((prevData) => [...prevData, error.message]);
          }
        });
    });
  };

  const googleLogIn = (e) => {
    e.preventDefault();

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        navigate("/");
        const user = result.user.uid;
        const url = "http://127.0.0.1:8000/api";
        const userData = {
          uid: user,
        };

        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      })
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const resetErrors = () => {
    setErrors([]);
  };

  useClickOutside(errorBoxRef, resetErrors);

  return (
    <>
      {errors.length > 0 ? (
        <div className="overlay-errors">
          <div className="error-box" ref={errorBoxRef}>
            <button className="button-close-edit-profile" onClick={resetErrors}>
              x
            </button>
            <h2>Something went wrong</h2>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <div className="login-box sign-up-box">
        <h2>Sign In</h2>
        <form method="post" action="">
          <div className="user-box">
            <input
              type="text"
              name="email"
              autoFocus
              autoCapitalize="none"
              autoComplete="email"
              maxLength={254}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className="user-box">
            <i
              className="fa-regular fa-eye"
              onClick={() => handleClick(inputOne, iconOne)}
              ref={iconOne}
            ></i>
            <input
              type="password"
              className="password"
              ref={inputOne}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="remember-me">
            <label htmlFor="checkbox">Remember me</label>
            <input type="checkbox" id="checkbox" ref={remmemberMeRef} />
          </div>

          <div className="google-btn">
            <button className="submit" onClick={Submitting}>
              Submit
            </button>
            <GoogleButton
              className="google-btn"
              label="Google Sign In"
              style={{
                width: "200px",
                height: "50px",
                margin: "auto",
                marginTop: "40px",
              }}
              onClick={googleLogIn}
            ></GoogleButton>
          </div>
        </form>
      </div>
    </>
  );
}

export default YourComponent;
