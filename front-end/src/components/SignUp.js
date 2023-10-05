import { useState, useEffect, useRef } from "react";

const SignUp = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ico1 = useRef(null);
  const ico2 = useRef(null);

  function Submitting(e) {
    e.preventDefault();
  }

  function ShowPassword(...clickedRef) {
    const [input, ico] = clickedRef;

    input.current.type =
      input.current.type === "password" ? "text" : "password";
    ico.current.classList.toggle("fa-eye");
    ico.current.classList.toggle("fa-eye-slash");

    // if (input.current.type === "password") {
    //   input.current.setAttribute("type", "text");
    //   ico.current.classList.add("fa-eye-slash");
    //   ico.current.classList.remove("fa-eye");
    // } else {
    //   input.current.setAttribute("type", "password");
    //   ico.current.classList.add("fa-eye");
    //   ico.current.classList.remove("fa-eye-slash");
    // }
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
              onClick={() => ShowPassword(ref1, ico1)}
              ref={ico1}
            ></i>
            <input type="password" className="password" ref={ref1} />
            <label>Password</label>
          </div>

          <div className="user-box">
            <i
              className="fa-regular fa-eye"
              onClick={() => ShowPassword(ref2, ico2)}
              ref={ico2}
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
