import React from "react";
import hero from "../../images/hero.png";
import { useState, useEffect } from "react";

function AuthHome() {
  const [heroTextLoaded, setHeroTextLoaded] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  useEffect(() => {
    localStorage.setItem("intendedDestination", "/");
    setTimeout(() => {
      setHeroImageLoaded(true);
    }, 200);
    setTimeout(() => {
      setHeroTextLoaded(true);
    }, 700);
  }, []);

  return (
    <div className="flex flex-col items-center mt-10 md:flex-row md:mt-10 mx-10 md:mx-16 transition duration-500">
      <div
        className={`${
          heroTextLoaded ? "opacity-1" : "opacity-0 translate-y-20"
        } flex flex-col items-center w-3/4 transition duration-500`}
      >
        <h1 className="text-textWhite text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-8">
          Welcome Back!
        </h1>
        <p className="text-textGrey text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Check out some posts
        </p>
      </div>

      <img
        className={`${
          heroImageLoaded ? "opacity-1" : "opacity-0 translate-y-20"
        } w-[400px] md:w-[500px] lg:w-[600px] xl:w-[1000px] 2xl:w-[1600px] transition duration-500`}
        alt="people working together on technical devices"
        src={hero}
      />
    </div>
  );
}

export default AuthHome;
