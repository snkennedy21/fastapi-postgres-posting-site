import React from "react";
import { Outlet } from "react-router-dom";

function Account() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}

export default Account;
