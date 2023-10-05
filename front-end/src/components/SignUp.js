import { useState, useEffect, useRef } from "react";

const SignUp = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  function Submitting(e) {
    e.preventDefault();
  }

  function ShowPassword(clickedRef) {
    const input = clickedRef.current;
    input.type === "password"
      ? input.setAttribute("type", "text")
      : input.setAttribute("type", "password");
  }
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
            />
            <label>Email</label>
          </div>

          <div className="user-box">
            <i
              className="fa-regular fa-eye"
              onClick={() => ShowPassword(ref1)}
            ></i>
            <input type="password" className="password" ref={ref1} />
            <label>Password</label>
          </div>

          <div className="user-box">
            <i
              className="fa-regular fa-eye"
              onClick={() => ShowPassword(ref2)}
            ></i>
            <input type="password" className="password" ref={ref2} />
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
