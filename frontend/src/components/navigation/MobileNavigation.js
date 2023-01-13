import React from "react";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { useLogoutMutation } from "../../store/rtk-query-apis/mainApi";

import { invalidateToken } from "../../store/rtk-slices/tokenSlice";

function MobileNavigation() {
  const token = useSelector((state) => state.token).token;
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  console.log(token);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
      if (windowSize > 768) {
        setNavOpen(false);
      }
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowSize]);

  // useEffect(() => {
  //   if (navOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else if (!navOpen) {
  //     document.body.style.overflow = "unset";
  //   }
  // }, [navOpen]);

  function logoutUser() {
    logout();
    dispatch(invalidateToken());
    navigate("/home");
  }

  function toggleNavHandler() {
    setNavOpen(!navOpen);
  }

  function navigateHandler(e) {
    setNavOpen(false);
    const location = e.currentTarget.dataset.value;
    navigate(location);
  }

  function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
  }

  return (
    <React.Fragment>
      <div
        className={`${
          navOpen
            ? "opacity-1 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } absolute z-40 top-0 left-0 bg-darkBackground backdrop-blur-sm w-full h-full tranistion duration-300 bg-opacity-80`}
      ></div>
      {/* Navigation Hamburger */}
      <div
        onClick={toggleNavHandler}
        className="fixed top-7 right-5 md:hidden cursor-pointer z-50"
      >
        <div
          className={`${
            navOpen ? "rotate-45 translate-y-2" : ""
          } transition duration-500 bg-textWhite w-9 h-0.5 m-1.5 z-50`}
        ></div>
        <div
          className={`${
            navOpen ? "opacity-0" : "opacity-100"
          } transition duration-300 bg-textWhite w-9 h-0.5 m-1.5 z-50`}
        ></div>
        <div
          className={`${
            navOpen ? "-rotate-45 -translate-y-2" : ""
          } transition duration-500 bg-textWhite w-9 h-0.5 m-1.5 z-50`}
        ></div>
      </div>

      {/* Mobile Navigation Pieces */}
      <nav
        className={`${
          navOpen ? "" : "-translate-x-40"
        } bg-lightBackground fixed top-0 left-0 w-32 h-full z-50 transition duration-300`}
      >
        <ul className="flex flex-col gap-6 items-center justify-around mt-5">
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
          </div>
          {token ? (
            <React.Fragment>
              <li
                onClick={navigateHandler}
                className="nav-button py-[30px]"
                data-value="/profile"
              >
                Profile
              </li>
              <li
                onClick={navigateHandler}
                className="nav-button py-[30px]"
                data-value="/posts"
              >
                Posts
              </li>
              <li className="nav-button py-[30px]">
                <button onClick={logoutUser}>Logout</button>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li
                onClick={navigateHandler}
                data-value="/posts"
                className="nav-button py-[30px]"
              >
                Posts
              </li>
              <li
                onClick={navigateHandler}
                data-value="/account/login"
                className="nav-button py-[30px]"
              >
                Login
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default MobileNavigation;
