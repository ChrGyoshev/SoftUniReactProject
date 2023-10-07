import React, { useRef } from "react";
import ShowPassword from "../assets/js/PasswordHide"; // Adjust the path as needed

function YourComponent() {
  const inputOne = useRef(null);
  const iconOne = useRef(null);
  const inputTwo = useRef(null);
  const iconTwo = useRef(null);

  const handleClick = (...clickedRef) => {
    const [input, ico] = clickedRef;
    ShowPassword(input, ico);
  };

  const Submitting = (e) => {
    e.preventDefault();
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
            />
            <label>Email</label>
          </div>

          <div className="user-box">
            <i
              className="fa-regular fa-eye"
              onClick={() => handleClick(inputOne, inputTwo)}
              ref={inputTwo}
            ></i>
            <input type="password" className="password" ref={inputOne} />
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
