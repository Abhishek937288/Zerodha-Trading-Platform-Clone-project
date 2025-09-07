import React from "react";
import { assets } from "../../../assets/assets";


const Hero = () => {
  return (
     
    <div className=" container mt-10 mb-20 flex flex-col justify-center items-center  gap-10">
      <div className="w-1/2 max-md:w-full">
        <img src={assets.homeHero} alt="" />
      </div>
      <div className="flex justify-center items-center flex-col gap-5 text-center">
        <h1 className="text-3xl font-semibold opacity-70 max-md:text-2xl max-sm:text-xl ">
          Invest in everything
        </h1>
        <p className="text-xl max-md:text-lg max-sm:text-md  opacity-80 text-center">
          Online platform to invest in stocks, derivatives, mutual funds, ETFs,
          bonds, and more.
        </p>
        <button className="bg-blue-500 px-10 py-2 rounded-sm text-white font-semibold text-xl text-center max-md:text-lg max-sm:text-md hover:bg-black cursor-pointer">
          Sign up for free
        </button>
      </div>
    </div>
  );
};

export default Hero;
