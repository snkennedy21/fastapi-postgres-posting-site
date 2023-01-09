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
    <div className="flex items-center mt-20">
      <div className="flex flex-col m-32 w-1/2">
        <h1 className="text-textWhite text-8xl mb-10">Join The Conversation</h1>
        <p className="text-textGrey text-5xl mb-12">
          Share your ideas, learn something new, and make friends in the
          process. Join the worlds fastest growing online forum!
        </p>
        <div className="flex gap-6">
          <div>
            <PrimaryButton
              clickHandler={() => {
                navigate("/account/signup");
              }}
            >
              {"Join Now"}
            </PrimaryButton>
          </div>
          <div>
            <SecondaryButton>{"Learn More"}</SecondaryButton>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-10">
          <div class="flex">
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
      <div className="w-1/2 m-32 flex justify-center">
        <img className="w-full" src={hero} />
      </div>
    </div>
  );
}

export default Homepage;
