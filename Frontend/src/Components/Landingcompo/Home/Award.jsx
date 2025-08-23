import React from "react";
import { assets } from "../../../assets/assets";

const Award = () => {
  return (
    <div className="mt-5 mb-10 container flex flex-col px-5 max-sm:px-2 ">
      <div className="text-center flex flex-start">
        <h4 className="text-2xl max-sm:text-xl font-semibold opacity-80">Trust with confidence</h4>
      </div>
      <div className="w-full grid gap-20 md:grid-cols-3 mt-5">
        <div className="flex  flex-col  gap-5">
          <div className="w-full flex flex-col gap-3 ">
            <h5 className="text-xl max-sm:text-lg font-semibold opacity-80 ">Customer-first always</h5>
            <p className="text-md max-sm:text-sm">
              That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh
              crores of equity investments, making us India’s largest broker;
              contributing to 15% of daily retail exchange volumes in India.
            </p>
          </div>
          <div className="flex  flex-col  gap-5">
            <h5 className="text-xl max-sm:text-lg font-semibold opacity-80">No spam or gimmicks</h5>
            <p className="text-md max-sm:text-sm">
              No gimmicks, spam, "gamification", or annoying push notifications.
              High quality apps that you use at your pace, the way you like.{" "}
              <a href="">Our philosophies</a>.
            </p>
          </div>
          <div className="flex  flex-col  gap-5">
            <h5 className="text-xl max-sm:text-lg font-semibold opacity-80">The Zerodha universe</h5>
            <p className="text-md max-sm:text-sm">
              Not just an app, but a whole ecosystem. Our investments in 30+
              fintech startups offer you tailored services specific to your
              needs.
            </p>
          </div>
          <div className="flex  flex-col  gap-5">
            <h5 className="text-xl  max-sm:text-lg font-semibold opacity-80">Do better with money</h5>
            <p className="text-md max-sm:text-sm"> 
              With initiatives like <a href="">Nudge</a> and{" "}
              <a href="">Kill Switch </a>, we don't just facilitate
              transactions, but actively help you do better with your money.
            </p>
          </div>
        </div>
        <div className="w-[80%] max-md:w-full flex flex-col  items-center justify-center col-span-2  lg:ml-20">
          <img src={assets.ecosystem}  alt="" />
          <div className=" flex gap-10 items-center justify-center">
            <a href="" className="text-center hover:text-blue-700">Explore our products <i className="fa-solid fa-arrow-right"></i></a>
            <a href="" className="text-center hover:text-blue-700">Try Kite demo <i className="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-center mt-5">
        <img src={assets.pressLogos} alt="" />
      </div>
    </div>
  );
};

export default Award;
