import { assets } from "@/assets/assets";
import React from "react";

const Signup = () => {
  return (
    <div className="w-full bg-slate-300 h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="conatiner grid grid-cols-1 md:grid-cols-2 max-sm:w-[100%] max-sm:h-[100%] md:w-[70%] md:h-[90%]  px-10 md:rounded-2xl bg-white ">
        <div className="flex items-center justify-center">
          <img src={assets.signupImg} alt="" />
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Signup;
