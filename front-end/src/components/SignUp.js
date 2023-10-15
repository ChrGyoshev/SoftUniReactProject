import { useState, useEffect, useRef } from "react";
import ShowPassword from "../assets/js/PasswordHide";
import { auth, onAuthStateChanged } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const inputOne = useRef(null);
  const iconOne = useRef(null);
  const inputTwo = useRef(null);
  const iconTwo = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Submitting = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/api";

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const postData = {
        uid: userCredential.user.uid,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Handle a successful POST request here
      } else {
        // Handle errors or failed requests
        console.error("POST request to Django failed");
      }
    } catch (error) {
      // Handle Firebase authentication errors
      console.error("Firebase authentication error:", error.message);
    }
  };

  const handleClick = (...clickedRef) => {
    const [input, ico] = clickedRef;
    ShowPassword(input, ico);
  };

  return (
    <>
      <div className="login-box sign-up-box">
        <h2>Sign Up</h2>

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
              onClick={() => handleClick(inputOne, inputTwo)}
              ref={inputTwo}
            ></i>
            <input
              type="password"
              className="password"
              ref={inputOne}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <div className="user-box">
            <i
              className="fa-regular fa-eye"
              onClick={() => handleClick(iconOne, iconTwo)}
              ref={iconTwo}
            ></i>
            <input type="password" className="password" ref={iconOne} />
            <label>Password</label>
          </div>

          <button className="submit" onClick={Submitting}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
