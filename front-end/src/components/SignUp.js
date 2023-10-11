import { useState, useEffect, useRef } from "react";
import ShowPassword from "../assets/js/PasswordHide";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

const SignUp = () => {
  const inputOne = useRef(null);
  const iconOne = useRef(null);
  const inputTwo = useRef(null);
  const iconTwo = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (auth.currentUser) {
    console.log(auth.currentUser.uid);
  }

  const Submitting = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const handleClick = (...clickedRef) => {
    const [input, ico] = clickedRef;
    ShowPassword(input, ico);
  };

  const LogOut = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      console.log("signed out");
    });
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

          <button onClick={LogOut}>LogOut</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
