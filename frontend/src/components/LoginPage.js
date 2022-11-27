import React from "react";
import { useState } from "react";
import { useLoginMutation } from "../store/rtk-query-apis/accountApi";

function LoginPage() {
  const [login] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function execute(e) {
    e.preventDefault();
    login(e.target);
  }

  function emailChangeHandler(e) {
    setEmail(e.target.value);
  }

  function passwordChangeHandler(e) {
    setPassword(e.target.value);
  }

  return (
    <div>
      <form onSubmit={execute}>
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
        <button>Submit</button>
      </form>
    </div>
  );
}

export default LoginPage;
