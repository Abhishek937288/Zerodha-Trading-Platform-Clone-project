import React from "react";

const Topbar = () => {
  return (
    <div className="w-full bg-white z-10 border-b border-slate-200 h-12 sm:h-14 sticky top-0 flex px-3 items-center justify-between overflow-hidden">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
          <span className="text-[9px] sm:text-[10px] lg:text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">
            NIFTY 50
          </span>
          <span className="text-[9px] sm:text-[10px] lg:text-xs font-semibold text-slate-700 whitespace-nowrap">
            22,456.80
          </span>
          <span className="text-[9px] sm:text-[10px] lg:text-xs text-red-500 font-medium whitespace-nowrap hidden md:block">
            -100.02
          </span>
          <span className="text-[9px] sm:text-[10px] lg:text-xs text-red-500 hidden md:block">
            <i className="fa-solid fa-caret-down"></i>
          </span>
        </div>
        <div className="w-px h-3 bg-slate-200 flex-shrink-0 hidden sm:block"></div>
        <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 hidden sm:flex">
          <span className="text-[9px] sm:text-[10px] lg:text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">
            SENSEX
          </span>
          <span className="text-[9px] sm:text-[10px] lg:text-xs font-semibold text-slate-700 whitespace-nowrap">
            73,892.15
          </span>
          <span className="text-[9px] sm:text-[10px] lg:text-xs text-red-500 font-medium whitespace-nowrap hidden lg:block">
            -312.45
          </span>
          <span className="text-[9px] sm:text-[10px] lg:text-xs text-red-500 hidden lg:block">
            <i className="fa-solid fa-caret-down"></i>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
      </div>
    </div>
  );
};

export default Topbar;
