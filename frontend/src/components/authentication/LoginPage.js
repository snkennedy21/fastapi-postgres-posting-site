import React from "react";
import { useState, useEffect } from "react";
import { useLoginMutation } from "../../store/rtk-query-apis/accountApi";
import { connect, useDispatch, useSelector } from "react-redux";

import { validateToken } from "../../store/rtk-slices/tokenSlice";

function LoginPage() {
  const [login, { isError, isSuccess }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token).token;

  useEffect(() => {
    let cook = document.cookie;
    if (cook) {
      dispatch(validateToken());
    }
  }, []);

  async function execute(e) {
    e.preventDefault();
    const payload = await login(e.target);
    if ("error" in payload) return;
    dispatch(validateToken());
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
        onSubmit={execute}
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
