// React Imports
import React from "react";
import { useState, useEffect } from "react";

// React Router Imports
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";

// RTK Query Imports
import { useLogoutMutation } from "../../store/rtk-query-apis/accountApi";

// RTK Slice Imports
import { invalidateToken } from "../../store/rtk-slices/tokenSlice";

function DesktopNavigation() {
  const token = useSelector((state) => state.token).token;
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutUser() {
    logout();
    dispatch(invalidateToken());
    navigate("/");
  }

  return (
    <nav className="bg-orange-200 flex justify-between px-12 py-4">
      <ul className="flex gap-6">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
      <ul className="flex gap-6">
        {token ? (
          <li>
            <button onClick={logoutUser}>Logout</button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default DesktopNavigation;
