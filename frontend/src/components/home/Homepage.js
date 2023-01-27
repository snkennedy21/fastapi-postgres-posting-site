// React Imports
import React from "react";
import hero from "../../images/hero.png";
import { useNavigate } from "react-router-dom";
import customer1 from "../../images/customer-1.jpg";
import customer2 from "../../images/customer-2.jpg";
import customer3 from "../../images/customer-3.jpg";
import customer4 from "../../images/customer-4.jpg";
import customer5 from "../../images/customer-5.jpg";
import customer6 from "../../images/customer-6.jpg";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Homepage() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token).token;
  const [heroTextLoaded, setHeroTextLoaded] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHeroImageLoaded(true);
    }, 200);
    setTimeout(() => {
      setHeroTextLoaded(true);
    }, 700);
  }, [token]);

  return (
    <div className="flex flex-col items-center mt-10 md:flex-row md:mt-10 mx-10 md:mx-16 transition duration-500">
      <div
        className={`${
          heroTextLoaded ? "opacity-1" : "opacity-0 translate-y-20"
        } flex flex-col items-center md:items-start transition duration-500`}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-textWhite text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-8">
            Join The Conversation
          </h1>
          <p className="text-textGrey text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-10">
            Share your ideas, learn something new, and make friends in the
            process. Join the worlds fastest growing online forum!
          </p>
        </div>
        <div className="2xl:self-center">
          <div className="flex gap-4 2xl:pt-10">
            <button
              onClick={() => {
                navigate("/account/signup");
              }}
              className="bg-primary px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:text-lg lg:px-9 lg:text-xl xl:px-14 xl:py-3 2xl:px-16 2xl:py-4 xl:text-2xl rounded-md text-textWhite hover:bg-primaryTint"
            >
              Sign Up
            </button>
            <button className="border-2 border-solid border-primary rounded-md px-3 py-0.5 sm:px-4 sm:py-1.5 md:px-6 md:text-lg lg:px-9 lg:text-xl xl:px-14 xl:text-2xl 2xl:px-16 text-primary hover:border-primaryTint hover:text-textWhite hover:bg-primaryTint">
              Learn More
            </button>
          </div>
          <div className="flex flex-col items-center gap-2 mt-10 md:mt-4">
            <div className="flex">
              <img
                className="rounded-full w-12 h-12 -mr-3 border-2 border-solid border-darkBackground lg:w-14 lg:h-14"
                src={customer1}
                alt="Customer 1"
              />
              <img
                className="rounded-full w-12 h-12 -mr-3 border-2 border-solid border-darkBackground lg:w-14 lg:h-14"
                src={customer2}
                alt="Customer 2"
              />
              <img
                className="rounded-full w-12 h-12 -mr-3 border-2 border-solid border-darkBackground lg:w-14 lg:h-14"
                src={customer3}
                alt="Customer 3"
              />
              <img
                className="rounded-full w-12 h-12 -mr-3 border-2 border-solid border-darkBackground lg:w-14 lg:h-14"
                src={customer4}
                alt="Customer 4"
              />
              <img
                className="rounded-full w-12 h-12 -mr-3 border-2 border-solid border-darkBackground lg:w-14 lg:h-14"
                src={customer5}
                alt="Customer 5"
              />
              <img
                className="rounded-full w-12 h-12 border-2 border-solid border-darkBackground lg:w-14 lg:h-14"
                src={customer6}
                alt="Customer 6"
              />
            </div>
            <p className="text-textGrey">
              <span className="text-primary">200,000+</span> Active Users
            </p>
          </div>
        </div>
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

export default Homepage;
