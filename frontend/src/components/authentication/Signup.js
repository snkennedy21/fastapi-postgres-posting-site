import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignupMutation } from "../../store/rtk-query-apis/mainApi";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
  const [passwordIsNotAcceptable, setPasswordIsNotAcceptable] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [signup, { error }] = useSignupMutation();

  function formSubmitHandler(e) {
    e.preventDefault();
    checkIfPasswordsMatch();
    const data = {
      username: username,
      email: email,
      password: password,
    };
    signup(data)
      .unwrap()
      .then((payload) => {})
      .catch((error) => {
        if (
          error.data.detail ===
          `username ${username} and email ${email} already exist`
        ) {
          setUsernameExists(true);
          setEmailExists(true);
        } else if (
          error.data.detail === `username ${username} already exists`
        ) {
          setUsernameExists(true);
        } else if (error.data.detail === `email ${email} already exists`) {
          setEmailExists(true);
        } else if (error.status === 422) {
          setEmailIsInvalid(true);
        }
      });
  }

  function checkIfPasswordsMatch() {
    if (password === confirmPassword) {
      setPasswordsDontMatch(false);
      return;
    }
    setPasswordsDontMatch(true);
  }

  function usernameChangeHandler(e) {
    setUsername(e.target.value);
    setUsernameExists(false);
  }

  function emailChangeHandler(e) {
    setEmail(e.target.value);
    setEmailExists(false);
  }

  function passwordChangeHandler(e) {
    setPassword(e.target.value);
    setPasswordsDontMatch(false);
  }

  function confirmPasswordChangeHandler(e) {
    setConfirmPassword(e.target.value);
    setPasswordsDontMatch(false);
  }

  return (
    <div className="flex flex-col items-center my-40 mx-10">
      <form
        onSubmit={formSubmitHandler}
        className="px-0 py-7 w-full max-w-[500px] bg-white rounded-md flex flex-col items-center"
      >
        <div className="mb-10 flex justify-center text-4xl">
          <h2>Create Account</h2>
        </div>
        <div className="mb-10 mb-2 flex flex-col w-3/4">
          {usernameExists ? (
            <p className="text-red-500 text-sm">
              User with this username already exists
            </p>
          ) : (
            <div className="h-5"></div>
          )}
          <input
            value={username}
            onChange={usernameChangeHandler}
            name="username"
            placeholder="Username"
            className={`${
              usernameExists ? "border-red-500" : "border-black"
            } p-2 text-2xl rounded-md border-black border-2 focus:border-primary outline-none transition`}
          ></input>
        </div>
        <div className="mb-10 mb-2 flex flex-col w-3/4">
          {emailExists ? (
            <p className="text-red-500 text-sm">
              User with this email already exists
            </p>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          {emailIsInvalid ? (
            <p className="text-red-500 text-sm">Please enter a valid email</p>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          <input
            value={email}
            onChange={emailChangeHandler}
            name="email"
            placeholder="Email"
            className={`${
              emailExists || emailIsInvalid
                ? "border-red-500"
                : "border-black mt-5"
            } p-2 text-2xl rounded-md border-black border-2 focus:border-primary outline-none transition`}
          ></input>
        </div>
        <div className="mb-10 mb-2 flex flex-col w-3/4">
          {passwordsDontMatch ? (
            <p className="text-red-500 text-sm">Passwords must match</p>
          ) : (
            <div className="h-5"></div>
          )}
          <input
            value={password}
            onChange={passwordChangeHandler}
            name="password"
            placeholder="Password"
            type="password"
            className={`${
              passwordsDontMatch ? "border-red-500" : "border-black"
            } p-2 text-2xl rounded-md border-black border-2 focus:border-primary outline-none transition`}
          ></input>
        </div>
        <div className="mb-10 mb-4 flex flex-col w-3/4">
          {passwordsDontMatch ? (
            <p className="text-red-500 text-sm">Passwords must match</p>
          ) : (
            <div className="h-5"></div>
          )}
          <input
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            name="confirm password"
            placeholder="Confirm Password"
            type="password"
            className={`${
              passwordsDontMatch ? "border-red-500" : "border-black"
            } p-2 text-2xl rounded-md border-black border-2 focus:border-primary outline-none transition`}
          ></input>
        </div>
        <div className="flex flex-col items-center gap-6">
          <button className="bg-primary px-12 py-2 rounded-md text-lg">
            Sign Up
          </button>
          <p>
            Already Have an Account?
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
