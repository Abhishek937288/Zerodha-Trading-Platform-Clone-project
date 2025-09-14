import React from "react";

const Topbar = () => {
  return (
    <div
      className="w-full 
     bg-white   z-10 border-b border-b-slate-300 h-20 sticky top-0 max-sm:top-20 flex px-5 gap-2  items-center justify-between"
    >
      <div className="flex text-center gap-2  items-center">
        <p className="max-sm:text-sm">NIFTY 50</p>
        <p className="text-red-400 text-xs sm:text-sm">100.02</p>
      </div>
      <div className="flex  gap-2  text-center  items-center">
        <p className="max-sm:text-sm">SENSEX</p>
        <p className="text-red-400 text-center text-xs sm:text-sm items-center">
          100.02
        </p>
      </div>
    </div>
  );
};

export default Topbar;
