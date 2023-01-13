import React from "react";
import { useState, useEffect } from "react";

function MobileNavigation() {
  const [navOpen, setNavOpen] = useState(false);
  // const [windowSize, setWindowSize] = useState(getWindowSize());

  // useEffect(() => {
  //   function handleWindowResize() {
  //     setWindowSize(getWindowSize());
  //     if (windowSize > 768) {
  //       setNavOpen(false);
  //     }
  //   }
  //   window.addEventListener("resize", handleWindowResize);

  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // }, [windowSize]);

  // useEffect(() => {
  //   if (navOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else if (!navOpen) {
  //     document.body.style.overflow = "unset";
  //   }
  // }, [navOpen]);

  function toggleNavHandler() {
    setNavOpen(!navOpen);
  }

  // function getWindowSize() {
  //   const { innerWidth } = window;
  //   return innerWidth;
  // }

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default MobileNavigation;
