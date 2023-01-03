// React Imports
import React from "react";
import { useState, useEffect } from "react";

// React Router Imports
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";

// RTK Query Imports
import { useLogoutMutation } from "../../store/rtk-query-apis/mainApi";

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
    navigate("/home");
  }

  function navigateHandler(e) {
    const location = e.target.dataset.value;
    navigate(location);
  }

  return (
    <nav className="bg-lightBackground flex justify-between px-12">
      <ul className="flex text-xl font-normal gap-1 my-1">
        <li onClick={navigateHandler} data-value="/home" className="nav-button">
          Home
        </li>
        <li
          onClick={navigateHandler}
          data-value="/posts"
          className="nav-button"
        >
          Posts
        </li>
        <li
          onClick={navigateHandler}
          data-value="/posts/create"
          className="nav-button"
        >
          Create Post
        </li>
      </ul>
      <ul className="flex gap-6 text-xl font-normal my-1">
        {token ? (
          <React.Fragment>
            <li
              onClick={navigateHandler}
              data-value="/profile"
              className="nav-button"
            >
              Profile
            </li>
            <li>
              <button className="nav-button" onClick={logoutUser}>
                Logout
              </button>
            </li>
          </React.Fragment>
        ) : (
          <li
            onClick={navigateHandler}
            data-value="/account/login"
            className="nav-button"
          >
            Login
          </li>
        )}
      </ul>
    </nav>
  );
}

export default DesktopNavigation;
