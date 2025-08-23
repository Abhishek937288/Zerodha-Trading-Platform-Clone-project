import { assets } from "@/assets/assets";
import Appspage from "@/Pages/Dashboardpages/Appspage";
import React from "react";

const Leftsection = ({
  imgurl,
  productname,
  description,
  trydemo,
  learnmore,
  googlePlay,
  appStore,
}) => {
  return (
    <div className="mt-20 container px-5 md:px-20 gap-15 grid  md:grid-cols-3">
      <div className="flex md:col-span-2 items-center">
        <img src={imgurl} alt="" />
      </div>
      <div className="flex  justify-center flex-col gap-5">
        
          <h4 className="text-2xl font-semibold opacity-80" >{productname}</h4>
      
        <p className="text-md opacity-90">
          {description}
        </p>
        <div className=" flex gap-10">
          <a href=""className="text-blue-700 text-center text-lg">{trydemo} </a>
          <a href=""className="text-blue-700 text-center text-lg">{learnmore} </a>
        </div>
        <div className="flex  max-sm:justify-center   md:flex-row gap-5 ">
          <img src={appStore} className="w-[100px] cursor-pointer" alt="" />
          <img src={googlePlay} alt="" className="w-[100px]"/>
        </div>
      </div>
    </div>
  );
};

export default Leftsection;
