import { assets } from "@/assets/assets";
import React from "react";

const Universe = () => {
  return (
    <div className=" mt-20 container px-5 md:px-20">
      <div className=" flex flex-col items-center justify-center gap-5">
        <h4 className="text-2xl font-semibold opacity-80">
          The Zerodha Universe
        </h4>
        <p className="text-lg  opacity-90">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
      </div>
      <div className="mt-20 md:w-[80%] md:mx-auto grid md:grid-cols-2 gap-20 lg:grid-cols-3">
        <div className="flex flex-col justify-center items-center   gap-3">
          <img src={assets.zerodhaFundhouse} className="w-50" alt="" />
          <p className="text-sm opacity-80 text-center">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more. .
          </p>
        </div>
        <div className="flex flex-col justify-center items-center   gap-3">
          <img src={assets.sensibullLogo} className="w-50" alt="" />
          <p className="text-sm opacity-80 text-center">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center   gap-3">
          <img src={assets.tijori} className="w-50" alt="" />
          <p className="text-sm opacity-80 text-center">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center   gap-3">
          <img src={assets.streakLogo} className="w-50" alt="" />
          <p className="text-sm opacity-80 text-center">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center   gap-3">
          <img src={assets.smallcaseLogo} className="w-50" alt="" />
          <p className="text-sm opacity-80 text-center">
            Thematic investing platform that helps you invest in diversified
            backtest of stocks on ETFs .
          </p>
        </div>
        <div className="flex flex-col justify-center items-center   gap-3">
          <img src={assets.dittoLogo} className="w-40" alt="" />
          <p className="text-sm opacity-80 text-center">
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Universe;
