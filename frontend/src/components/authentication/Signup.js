import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSignupMutation } from "../../store/rtk-query-apis/mainApi";
import { useDispatch } from "react-redux";
import { validateToken } from "../../store/rtk-slices/tokenSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { error }] = useSignupMutation();

  // Form State
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error State
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  function formSubmitHandler(e) {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };
    signup(data)
      .unwrap()
      .then((payload) => {
        dispatch(validateToken());
        navigate("/home");
      })
      .catch((error) => {
        if (error.data.detail.includes("usernameExists")) {
          setUsernameError("This username already exists");
        }
        if (error.data.detail.includes("emailExists")) {
          setEmailError("This email already exists");
        }
        if (error.data.detail.includes("emailInvalid")) {
          setEmailError("Invalid Email");
        }
        if (error.data.detail.includes("passwordsDontMatch")) {
          setPasswordError("Passwords must match");
          setConfirmPasswordError("Passwords must match");
        }
        if (error.data.detail.includes("usernameEmpty")) {
          setUsernameError("Required Field");
        }
        if (error.data.detail.includes("emailEmpty")) {
          setEmailError("Required Field");
        }
        if (error.data.detail.includes("passwordEmpty")) {
          setPasswordError("Required Field");
        }
        if (error.data.detail.includes("confirmPasswordEmpty")) {
          setConfirmPasswordError("Required Field");
        }
      });
  }

  function usernameChangeHandler(e) {
    setUsernameError("");
    setUsername(e.target.value);
  }

  function emailChangeHandler(e) {
    setEmailError("");
    setEmail(e.target.value);
  }

  function passwordChangeHandler(e) {
    setPasswordError("");
    if (confirmPassword.length !== 0) setConfirmPasswordError("");
    setPassword(e.target.value);
  }

  function confirmPasswordChangeHandler(e) {
    setConfirmPasswordError("");
    if (password.length !== 0) setPasswordError("");
    setConfirmPassword(e.target.value);
  }

  return (
    <div className="flex flex-col items-center my-40 mx-10">
      <form
        onSubmit={formSubmitHandler}
        className="px-0 py-7 w-full max-w-[500px] bg-lightBackground rounded-md flex flex-col items-center"
      >
        <div className="mb-10 flex justify-center text-4xl">
          <h2 className="text-textWhite">Create Account</h2>
        </div>
        <div className="mb-10 mb-2 flex flex-col w-3/4">
          {usernameError !== "" ? (
            <p className="text-red-600 text-sm">{usernameError}</p>
          ) : (
            <React.Fragment />
          )}
          <input
            value={username}
            onChange={usernameChangeHandler}
            name="username"
            placeholder="Username"
            className={`${
              usernameError ? "border-red-800" : "border-border mt-5"
            } p-2 text-2xl text-textGrey rounded-md bg-darkBackground border-2 focus:border-primary outline-none transition`}
          ></input>
        </div>
        <div className="mb-10 mb-2 flex flex-col w-3/4">
          {emailError !== "" ? (
            <p className="text-red-600 text-sm">{emailError}</p>
          ) : (
            <React.Fragment />
          )}
          <input
            value={email}
            onChange={emailChangeHandler}
            name="email"
            placeholder="Email"
            className={`${
              emailError ? "border-red-800" : "border-border mt-5"
            } p-2 text-2xl text-textGrey rounded-md bg-darkBackground border-2 focus:border-primary outline-none transition`}
          ></input>
        </div>
        <div className="mb-10 mb-2 flex flex-col w-3/4">
          {passwordError !== "" ? (
            <p className="text-red-600 text-sm">{passwordError}</p>
          ) : (
            <React.Fragment />
          )}
          <input
            value={password}
            onChange={passwordChangeHandler}
            name="password"
            placeholder="Password"
            type="password"
            className={`${
              passwordError ? "border-red-800" : "border-border mt-5"
            } p-2 text-2xl text-textGrey rounded-md bg-darkBackground border-2 focus:border-primary outline-none transition`}
          ></input>
        </div>
        <div className="mb-10 mb-4 flex flex-col w-3/4">
          {confirmPasswordError !== "" ? (
            <p className="text-red-600 text-sm">{confirmPasswordError}</p>
          ) : (
            <React.Fragment />
          )}
          <input
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            name="confirm password"
            placeholder="Confirm Password"
            type="password"
            className={`${
              confirmPasswordError ? "border-red-800" : "border-border mt-5"
            } p-2 text-2xl text-textGrey rounded-md bg-darkBackground border-2 focus:border-primary outline-none transition`}
          ></input>
        </div>
        <div className="flex flex-col items-center gap-6">
          <button className="bg-primary px-12 py-2 rounded-md text-lg">
            Sign Up
          </button>
          <p>
            Already Have an Account?{" "}
            <Link
              className="text-primary hover:text-red-500"
              to="/account/login"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
