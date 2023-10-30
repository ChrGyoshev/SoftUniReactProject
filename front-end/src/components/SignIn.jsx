import React, { useRef, useState } from "react";
import ShowPassword from "../assets/js/PasswordHide";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import GoogleButton from "react-google-button";

function YourComponent() {
  const inputOne = useRef(null);
  const iconOne = useRef(null);
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = (...clickedRef) => {
    const [input, ico] = clickedRef;
    ShowPassword(input, ico);
  };

  const Submitting = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredidential) => {
        
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/too-many-requests")
          setError("too many requests");
      });
  };

  const googleLogIn = (e) => {
    e.preventDefault();

    signInWithPopup(auth, googleProvider)
      .then((result) => {
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
      .then((result) => {
        navigate("/profile-details");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
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

      {error && <div className="error">{error}</div>}
    </>
  );
}

export default YourComponent;
