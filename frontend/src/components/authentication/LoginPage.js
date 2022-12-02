// React Imports
import React from "react";
import { useState, useEffect } from "react";

// React Router Imports
import { useNavigate } from "react-router-dom";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";

// RTK Query Imports
import { useLoginMutation } from "../../store/rtk-query-apis/accountApi";

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
    console.log(payload);
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
    <div className="flex flex-col justify-center items-center py-28">
      <form
        onSubmit={loginHandler}
        className="bg-blue-100 flex flex-col gap-6 w-60 p-12"
      >
        <input
          name="email"
          value={email}
          onChange={emailChangeHandler}
          placeholder="Email"
        ></input>
        <input
          name="password"
          onChange={passwordChangeHandler}
          value={password}
          placeholder="Password"
          type="password"
        ></input>
        <button className="bg-green-400">Login</button>
      </form>
      {token ? <p>Hello Cookie</p> : <p>No Cookie</p>}
    </div>
  );
}

export default LoginPage;
