import { useState } from "react";

const SignUp = () => {
  function Submitting(e) {
    e.preventDefault();
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
            <i className="fa-regular fa-eye"></i>
            <input type="password" />
            <label>Password</label>
          </div>

          <div className="user-box">
            <i className="fa-regular fa-eye"></i>
            <input type="password" />
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
