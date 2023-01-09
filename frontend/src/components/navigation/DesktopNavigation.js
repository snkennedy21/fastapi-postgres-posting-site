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

import logo from "../../images/logo.png";

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
    const location = e.currentTarget.dataset.value;
    navigate(location);
  }

  return (
    <nav className="bg-lightBackground flex justify-between px-12">
      <ul className="flex text-xl font-normal gap-1 my-1 items-center">
        <div
          onClick={navigateHandler}
          data-value="/home"
          className="flex items-center gap-8 mt-5 mb-2 hover:cursor-pointer"
        >
          <div className="relative">
            <div className="w-3 h-3 bg-primary absolute right-2.5 -top-2.5 -rotate-45"></div>
            <div className="w-3 h-3 bg-primary absolute -right-1.5 top-3 -rotate-25"></div>
            <div className="w-3 h-3 bg-primary absolute -right-4 -top-3 -rotate-15"></div>
            <div className="w-3 h-3 bg-textWhite m-0.5"></div>
            <div className="flex">
              <div className="w-3 h-3 bg-textWhite m-0.5"></div>
              <div className="w-3 h-3 bg-textWhite m-0.5"></div>
            </div>
            <div className="flex">
              <div className="w-3 h-3 bg-textWhite m-0.5"></div>
              <div className="w-3 h-3 bg-textWhite m-0.5"></div>
              <div className="w-3 h-3 bg-textWhite m-0.5"></div>
            </div>
          </div>
          <p className="text-textWhite">Full Stack Overflow</p>
        </div>
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
