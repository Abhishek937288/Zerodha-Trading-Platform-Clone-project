import React from "react";
import { assets } from "../../../assets/assets";

const Stats = () => {
  return (
    <div className="w-full grid grid-cols-3 px-30 grid-flow-row mt-20 mb-10 gap-10">
      <div className="col-span-1 flex flex-col gap-3" >
        <h4 className="text-xl font-semibold opacity-80">Unbeatable pricing</h4>
        <p className="text-[15px] opacity-80 font-normal">We pioneered the concept of discount broking and  price transparency in India.Flat fees and no hidden charges.</p>
        <a href="" className="text-blue-700 font-semibold opacity-80">See pricing <i className="fa-solid fa-arrow-right"></i></a>
      </div>
      <div className="grid grid-cols-3 gap-2 col-span-2 pl-10">
  <div className="col-span-1 flex items-center px-5">
    <img src={assets.pricingO} className="w-1/2 " alt="" />
    <p  className="text-[12px] opacity-80">Free account opening</p>
  </div>
  <div className="col-span-1 flex items-center py-5">
    <img src={assets.pricingO} className="w-1/2" alt="" />
    <span className="text-[12px] opacity-80">Free equity delivery and direct mutual funds</span>
  </div>
  <div className="col-span-1 flex items-center py-5">
    <img src={assets.intradayTrades} className="w-1/2" alt="" />
    <p  className="text-[12px] opacity-80">Intraday and F&O</p>
  </div>
</div>
    </div>
  );
};

export default Stats;
