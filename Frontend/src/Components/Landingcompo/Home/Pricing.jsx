import React from "react";
import { assets } from "../../../assets/assets";

const Pricing = () => {
  return (
    <div className=" container  h-[80vh] grid grid-rows-2 gap-10 px-5  md:grid-rows-1 md:grid-cols-3 md:h-[40vh] mb-20">
      <div className=" flex flex-col   gap-3 justify-center">
        <h1 className="text-xl font-semibold opacity-80 ">
          Unbeatable pricing
        </h1>

        <p className="md:text-lg sm:text-md text-sm  ">
          We pioneered the concept of discount broking and price transparency in
          India. Flat fees and no hidden charges.
        </p>
        <a href="" className="text-blue-700">
          See Pricing <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
      <div className=" flex flex-col  items-center justify-center md:flex-row md:col-span-2 gap-5 ">
        <div className=" flex flex-col md:flex-row items-center justify-center">
          <img src={assets.pricingO} className="w-30" alt="" />
          <p
            className=" text-sm opacity-80
          "
          >
            Free account opening
          </p>
        </div>
        <div className=" flex flex-col md:flex-row items-center justify-center">
          <img src={assets.pricingO} className="w-30" alt="" />
          <p
            className=" text-sm opacity-80
          "
          >
            Free equity delivery and direct mutual funds
          </p>
        </div>
        <div className=" flex flex-col md:flex-row items-center justify-center">
          <img src={assets.intradayTrades} className="w-30" alt="" />
          <p
            className=" text-sm opacity-80
          "
          >
            Intraday and F&O
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
