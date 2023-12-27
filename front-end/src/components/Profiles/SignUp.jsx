import { useState, useRef, useEffect } from "react";
import ShowPassword from "../../assets/js/PasswordHide";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";
import ErrorBox from "../ErrorsBox";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const passwordInputField = useRef(null);
  const passwordConfirmInput = useRef(null);
  const passwordShowHideIcon = useRef(null);
  const passwordConfirmIcon = useRef(null);

  const [errors, setErrors] = useState([]);
  const errorBoxRef = useRef(null);
  let navigate = useNavigate();

  const formChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const Submitting = async (e) => {
    e.preventDefault();

    const url = "https://react-app-book-buzz.onrender.com/api";

    if (formData.password === formData.confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
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
          setErrors((prevErrors) => [
            ...prevErrors,
            "POST request to Django failed",
          ]);
        }
      } catch (error) {
        setErrors((prevErrors) => [...prevErrors, error.message]);
        auth.currentUser.delete();
      }
    } else {
      setErrors((prevErrors) => [...prevErrors, "Passwords did not match!"]);
    }
  };

  const showHidePasswordHandler = (...clickedRef) => {
    const [input, icon] = clickedRef;
    ShowPassword(input, icon);
  };

  const resetErrors = () => {
    setErrors([]);
  };

  useClickOutside(errorBoxRef, resetErrors);

  return (
    <>
      {errors.length > 0 && (
        <ErrorBox {...{ resetErrors, errors, errorBoxRef }} />
      )}

      <div className="login-box sign-up-box">
        <h2>Sign Up</h2>

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
              onChange={formChangeHandler}
              value={formData.email}
            />

            <label>Email</label>
          </div>
          <div className="user-box">
            <i
              className="fa-regular fa-eye"
              onClick={() =>
                showHidePasswordHandler(
                  passwordInputField,
                  passwordShowHideIcon
                )
              }
              ref={passwordShowHideIcon}
            ></i>
            <input
              type="password"
              name="password"
              value={formData.password}
              className="password"
              ref={passwordInputField}
              onChange={formChangeHandler}
            />

            <label>Password</label>
          </div>
          <div className="user-box">
            <i
              className="fa-regular fa-eye"
              onClick={() =>
                showHidePasswordHandler(
                  passwordConfirmInput,
                  passwordConfirmIcon
                )
              }
              ref={passwordConfirmIcon}
            ></i>
            <input
              type="password"
              className="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={formChangeHandler}
              ref={passwordConfirmInput}
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
