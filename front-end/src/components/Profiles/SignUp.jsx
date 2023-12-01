import { useState, useRef, useEffect } from "react";
import ShowPassword from "../../assets/js/PasswordHide";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";

const SignUp = () => {
  const inputOne = useRef(null);
  const iconOne = useRef(null);
  const inputTwo = useRef(null);
  const iconTwo = useRef(null);
  const errorBoxRef = useRef(null);
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const Submitting = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/api";

    if (password === confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const postData = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          navigate("/");
        } else {
          console.error("POST request to Django failed");
        }
      } catch (error) {
        console.log("Firebase authentication error:", error.message);
        setErrors((prevErrors) => [...prevErrors, error.message]);
        console.log(auth.currentUser.delete());
      }
    } else {
      setErrors((prevErrors) => [...prevErrors, "Passwords did not match!"]);
    }
  };

  const handleClick = (...clickedRef) => {
    const [input, ico] = clickedRef;
    ShowPassword(input, ico);
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
            <input
              type="password"
              className="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              ref={iconOne}
            />
            <label>Confirm Password</label>
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
