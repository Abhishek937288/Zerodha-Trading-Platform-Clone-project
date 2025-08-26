import React from "react";
import { Link } from "react-router-dom";
import { assets } from "@/assets/assets";

const Commonpagenav = () => {
  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-10">
      <nav className=" container h-16  flex items-center  justify-between px-5">
        <div className="">
          <Link to="/">
            <img src={assets.logo} alt="" className="max-w-40" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Commonpagenav;
