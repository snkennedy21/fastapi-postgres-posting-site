// React Imports
import React from "react";
import { useState, useEffect } from "react";

// React Router Imports
import { useNavigate } from "react-router-dom";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";

// RTK Query Imports
import { useLoginMutation } from "../../store/rtk-query-apis/mainApi";

// RTK Slice Imports
import { validateToken } from "../../store/rtk-slices/tokenSlice";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const token = useSelector((state) => state.token).token;
  const navigate = useNavigate();

  async function loginHandler(e) {
    e.preventDefault();
    const payload = await login(e.target);
    if ("error" in payload) return;
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
    <div className="flex flex-col items-center mt-40 mx-10">
      <form
        onSubmit={loginHandler}
        className="px-0 py-7 w-full max-w-[500px] bg-white rounded-md"
      >
        <div className="mb-10 flex justify-center text-4xl">
          <h2>Login</h2>
        </div>
        <div className="mb-10 flex flex-col items-center">
          <input
            name="email"
            value={email}
            onChange={emailChangeHandler}
            placeholder="Email"
            className="w-3/4 p-2 text-2xl rounded-md border-black border-2 focus:border-primary outline-none transition duration-300"
          ></input>
        </div>
        <div className="mb-10 flex flex-col mb-3 items-center">
          <input
            name="password"
            onChange={passwordChangeHandler}
            value={password}
            placeholder="Password"
            type="password"
            className="w-3/4 p-2 text-2xl rounded-md border-black border-2 focus:border-primary outline-none transition duration-300"
          ></input>
        </div>
        <div className="flex flex-col items-center gap-6">
          <button className="bg-primary px-12 py-2 rounded-md text-lg">
            Login
          </button>
          <p>Sign Up Here</p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
