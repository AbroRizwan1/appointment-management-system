import React from "react";
import Leftside from "./Leftside";
import Rightside from "./Rightside";
import StatsCard from "./StatsCard";

const Main = () => {
  return (
    <>
      <div className="mt-6 md:mt-30 sm:mt-8 ">
        <div
          className=" 
    bg-[linear-gradient(60deg,rgba(172,193,242,1)_10%,rgba(255,212,216,1)_80%,rgba(172,193,242,1)_100%)]
    mx-4 sm:mx-6 md:mx-10
    rounded-lg
    grid grid-cols-1 lg:grid-cols-2
    gap-8 lg:gap-16
    overflow-hidden
  "
        >
          <Leftside />
          <Rightside />
        </div>
      </div>
      <div className="">
        <StatsCard />
      </div>
    </>
  );
};

export default Main;
