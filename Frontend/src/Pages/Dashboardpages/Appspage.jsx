import React from "react";
import { assets } from "@/assets/assets";

const Appspage = () => {
  return (
    <div className="max-w-6xl min-h-[80vh] mt-5  mx-auto px-5 grid gap-10 md:grid-cols-2 items-center">
      
      <div className="flex flex-col gap-5 text-center md:text-left">
        <button className="px-3 py-1 bg-slate-100 rounded-2xl text-blue-700 font-semibold w-fit mx-auto md:mx-0">
          coming soon
        </button>

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold opacity-80">
           Invest Smarter, Trade Faster
        </h3>

        <p className="text-sm sm:text-base opacity-70">
           Stay ahead of the market with real-time stock updates, smart portfolio
  tracking, and powerful tools to help you make better investment decisions.
        </p>

        
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <input
            type="text"
            placeholder="Email address"
            className="border border-slate-300 px-4 py-2 rounded-lg w-full sm:w-auto"
          />
          <button className="px-5 py-2 bg-blue-700 text-white rounded-lg w-full sm:w-auto">
            Invite Me
          </button>
        </div>

        <p className="text-sm sm:text-base opacity-70">
          Whether you’re a beginner or a pro, our platform gives you insights, charts,
  and strategies to maximize your returns with confidence.
        </p>
      </div>

    
      <div className="w-full h-64 sm:h-80 md:h-[80vh] mb-5">
        <img
          src={assets.commingSoon}
          alt="Coming Soon"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Appspage;
