import React, { useRef } from "react";
import ShowPassword from "../assets/js/PasswordHide";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function YourComponent() {
  const inputOne = useRef(null);
  const iconOne = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (...clickedRef) => {
    const [input, ico] = clickedRef;
    ShowPassword(input, ico);
  };

  const Submitting = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredidential) => {
        console.log(userCredidential.email);
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

          <button className="submit" onClick={Submitting}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default YourComponent;
