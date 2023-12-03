import React, { useRef, useState } from "react";
import ShowPassword from "../../assets/js/PasswordHide";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import GoogleButton from "react-google-button";
import useClickOutside from "../hooks/useClickOutside";
import ErrorBox from "../ErrorsBox";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const passwordInput = useRef(null);
  const showPasswordIcon = useRef(null);
  const errorBoxRef = useRef(null);
  const remmemberMeRef = useRef(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const formChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showHidePasswordHandler = (...clickedRef) => {
    const [passwordInput, showPasswordIcon] = clickedRef;
    ShowPassword(passwordInput, showPasswordIcon);
  };

  const Submitting = (e) => {
    e.preventDefault();
    const browserPersistence = remmemberMeRef.current.checked
      ? browserLocalPersistence
      : browserSessionPersistence;
    setPersistence(auth, browserPersistence).then(function () {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
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
        const url = "http://127.0.0.1:8000/api";
        const userData = {
          uid: result.user.uid,
          email: result.user.email,
        };

        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      })

      .catch((error) => {
        console.error(error);
      });
  };

  const resetErrors = () => {
    setErrors([]);
  };

  useClickOutside(errorBoxRef, resetErrors);

  function forgottenPasswordHandler() {
    sendPasswordResetEmail(auth, formData.email)
      .then(() => {
        setErrors((prevData) => [...prevData, "password reset mail sent"]);
      })
      .catch((error) => {
        setErrors((prevData) => [...prevData, error.message]);
      });
  }

  return (
    <>
      {errors.length > 0 && (
        <ErrorBox {...{ resetErrors, errors, errorBoxRef }} />
      )}

      <div className="login-box sign-up-box">
        <h2>Sign In</h2>

        <form method="post" action="">
          <div className="user-box">
            <input
              type="text"
              name="email"
              id="email"
              autoFocus
              autoCapitalize="none"
              autoComplete="email"
              maxLength={254}
              value={formData.email}
              onChange={formChangeHandler}
            />

            <label>Email</label>
          </div>
          <div className="user-box">
            <i
              className="fa-regular fa-eye"
              onClick={() =>
                showHidePasswordHandler(passwordInput, showPasswordIcon)
              }
              ref={showPasswordIcon}
            ></i>
            <input
              name="password"
              id="password"
              type="password"
              className="password"
              value={formData.password}
              ref={passwordInput}
              onChange={formChangeHandler}
            />

            <label>Password</label>
          </div>
          <div className="remember-me">
            <label htmlFor="checkbox">Remember me</label>
            <input type="checkbox" id="checkbox" ref={remmemberMeRef} />
          </div>
          <div className="forgoten-password">
            <button type="button" onClick={forgottenPasswordHandler}>
              Forgotten Password
            </button>
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

export default SignIn;
