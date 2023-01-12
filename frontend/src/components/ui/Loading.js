import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="flex justify-center mt-60">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="flex">
            <div className="w-3 h-3 bg-textWhite m-0.5"></div>
            <div className="w-3 h-3 bg-primary m-0.5 move1"></div>
            <div className="w-3 h-3 bg-primary m-0.5 move2"></div>
          </div>
          <div className="flex">
            <div className="w-3 h-3 bg-textWhite m-0.5"></div>
            <div className="w-3 h-3 bg-textWhite m-0.5"></div>
            <div className="w-3 h-3 bg-primary m-0.5 move3"></div>
          </div>
          <div className="flex">
            <div className="w-3 h-3 bg-textWhite m-0.5"></div>
            <div className="w-3 h-3 bg-textWhite m-0.5"></div>
            <div className="w-3 h-3 bg-textWhite m-0.5"></div>
          </div>
        </div>
        <p className="text-textWhite">Loading</p>
      </div>
    </div>
  );
}

export default Loading;
