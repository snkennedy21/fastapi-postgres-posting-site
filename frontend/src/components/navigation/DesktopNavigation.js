// React Imports
import React from "react";
import { useState } from "react";

// React Router Imports
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
  const [logoHovered, setLogoHovered] = useState(false);

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
    <nav className="bg-lightBackground flex justify-between px-2 w-full">
      <ul className="flex text-xl font-normal gap-1 items-center mt-4 mb-1">
        <div
          onClick={navigateHandler}
          data-value="/home"
          onMouseEnter={() => {
            setLogoHovered(true);
          }}
          onMouseLeave={() => {
            setLogoHovered(false);
          }}
          className="flex items-center gap-5 pt-2 pb-2 px-4 rounded-md hover:cursor-pointer hover:bg-darkBackground transition"
        >
          <div className="relative">
            <div
              className={`${
                logoHovered
                  ? "-translate-x-2 translate-y-3 rotate-0"
                  : "rotate-45"
              } w-3 h-3 bg-primary absolute right-2.5 -top-2.5 transition duration-500`}
            ></div>
            <div
              className={`${
                logoHovered
                  ? "-translate-x-2 translate-y-1.5 rotate-0"
                  : "rotate-75"
              } w-3 h-3 bg-primary absolute -right-1.5 top-3 transition duration-500`}
            ></div>
            <div
              className={` ${
                logoHovered
                  ? "-translate-x-[18px] translate-y-3.5 rotate-0"
                  : "rotate-85"
              } w-3 h-3 bg-primary absolute -right-4 -top-3 transition duration-500`}
            ></div>
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
      </ul>
      <ul className="hidden md:flex gap-6 text-xl font-normal mt-4 mb-1 items-center">
        {token ? (
          <React.Fragment>
            <li
              onClick={navigateHandler}
              data-value="/profile"
              className="nav-button"
            >
              Profile
            </li>
            <li
              onClick={navigateHandler}
              data-value="/posts"
              className="nav-button"
            >
              Posts
            </li>
            <li>
              <button className="nav-button" onClick={logoutUser}>
                Logout
              </button>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li
              onClick={navigateHandler}
              data-value="/posts"
              className="nav-button"
            >
              Posts
            </li>
            <li
              onClick={navigateHandler}
              data-value="/account/login"
              className="nav-button"
            >
              Login
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
}

export default DesktopNavigation;
