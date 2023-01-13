// React Imports
import React from "react";
import { useState } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import hero from "../../images/hero.png";
import { useNavigate } from "react-router-dom";
import customer1 from "../../images/customer-1.jpg";
import customer2 from "../../images/customer-2.jpg";
import customer3 from "../../images/customer-3.jpg";
import customer4 from "../../images/customer-4.jpg";
import customer5 from "../../images/customer-5.jpg";
import customer6 from "../../images/customer-6.jpg";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mt-10 md:mt-10 mx-10 md:mx-16">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-textWhite text-4xl sm:text-5xl xl:text-7xl mb-10">
            Join The Conversation
          </h1>
          <p className="text-textGrey text-xl sm:text-3xl xl:text-4xl mb-12 md:mb-0">
            Share your ideas, learn something new, and make friends in the
            process. Join the worlds fastest growing online forum!
          </p>
        </div>

        <img
          className="w-[500px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[800px]"
          src={hero}
        />
      </div>
      <div className="flex flex-col items-center md:items-start">
        <div className="flex gap-6 mt-14">
          <button className="bg-primary px-3 py-1 sm:px-4 sm:py-2 rounded-md text-textWhite hover:bg-primaryTint">
            Sign Up
          </button>
          <button className="border-2 border-solid border-primary rounded-md px-3 py-0.5 sm:px-4 sm:py-1.5 text-primary hover:border-primaryTint hover:text-textWhite hover:bg-primaryTint">
            Learn More
          </button>
        </div>
        <div className="flex flex-col items-center gap-4 mt-10 md:mt-4">
          <div className="flex">
            <img
              className="rounded-full w-12 h-12 -mr-3 border-2 border-solid border-darkBackground"
              src={customer1}
              alt="Customer photo"
            />
            <img
              className="rounded-full w-12 h-12 -mr-3 border-2 border-solid border-darkBackground"
              src={customer2}
              alt="Customer photo"
            />
            <img
              className="rounded-full w-12 h-12 -mr-3 border-2 border-solid border-darkBackground"
              src={customer3}
              alt="Customer photo"
            />
            <img
              className="rounded-full w-12 h-12 -mr-3 border-2 border-solid border-darkBackground"
              src={customer4}
              alt="Customer photo"
            />
            <img
              className="rounded-full w-12 h-12 -mr-3 border-2 border-solid border-darkBackground"
              src={customer5}
              alt="Customer photo"
            />
            <img
              className="rounded-full w-12 h-12 border-2 border-solid border-darkBackground"
              src={customer6}
              alt="Customer photo"
            />
          </div>
          <p className="text-textGrey">
            <span className="text-primary">200,000+</span> Active Users
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
