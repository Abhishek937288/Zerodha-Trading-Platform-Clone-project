import React from "react";
import { assets } from "../../../assets/assets.js";

const Education = () => {
  return (
    <div className="container  mt-10 flex flex-col items-center gap-10 md:gap-40 px-10 md:flex-row">
      <div className="">
        <img src={assets.education} alt="" className="w-full" />
      </div>
      <div className=" flex flex-col gap-3 md:w-[50%] ">
        <h4 className="text-xl max-sm:text-md font-semibold opacity-80">
          Free and open market education
        </h4>
        <p className="text-lg max-sm:text-sm opacity-80">
          Varsity, the largest online stock market education book in the world
          covering everything from the basics to advanced trading.
        </p>
        <a href="" className="text-blue-700">
          Varsity <i className="fa-solid fa-arrow-right"></i>
        </a>
        <p className="text-lg opacity-80 max-sm:text-sm">
          TradingQ&A, the most active trading and investment community in India
          for all your market related queries.
        </p>
        <a href="" className="text-blue-700">
          TradingQ&A <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};

export default Education;
