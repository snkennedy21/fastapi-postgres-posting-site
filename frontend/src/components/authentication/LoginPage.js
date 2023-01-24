// React Imports
import React from "react";
import { useState } from "react";

// React Router Imports
import { useNavigate, Link } from "react-router-dom";

// Redux Imports
import { useDispatch } from "react-redux";

// RTK Query Imports
import { useLoginMutation } from "../../store/rtk-query-apis/mainApi";

// RTK Slice Imports
import { validateToken } from "../../store/rtk-slices/tokenSlice";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  async function loginHandler(e) {
    e.preventDefault();
    const payload = await login(e.target);
    if ("error" in payload) return;
    let expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000);
    document.cookie = `session=true; expires=${expirationTime.toUTCString()}; path=/`;
    dispatch(validateToken());
    navigate("/");
  }

  function emailChangeHandler(e) {
    setEmail(e.target.value);
  }

  function passwordChangeHandler(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="flex flex-col items-center my-40 mx-10">
      <form
        onSubmit={loginHandler}
        className="px-0 py-7 w-full max-w-[500px] bg-lightBackground rounded-md"
      >
        <div className="mb-10 flex justify-center text-4xl">
          <h2 className="text-textWhite">Login</h2>
        </div>
        <div className="mb-10 flex flex-col items-center">
          <input
            name="email"
            value={email}
            onChange={emailChangeHandler}
            placeholder="Username"
            className="w-3/4 p-2 text-2xl text-textGrey bg-darkBackground rounded-md border-border border-2 focus:border-primary outline-none transition"
          ></input>
        </div>
        <div className="mb-10 flex flex-col mb-3 items-center">
          <input
            name="password"
            onChange={passwordChangeHandler}
            value={password}
            placeholder="Password"
            type="password"
            className="w-3/4 p-2 text-2xl text-textGrey bg-darkBackground rounded-md border-border border-2 focus:border-primary outline-none transition"
          ></input>
        </div>
        <div className="flex flex-col items-center gap-6">
          <button className="bg-primary px-12 py-2 rounded-md text-lg">
            Login
          </button>
          <p className="text-textGrey">
            Sign Up{" "}
            <Link
              className="text-primary hover:text-red-500"
              to="/account/signup"
            >
              Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
