import React from "react";
import { useWatchlistStore } from "@/Store/watchlistStore";

const MobileWatchlistBar = ({ onOpenWatchlist }) => {
  const { stocksData, isLoading } = useWatchlistStore();

  if (isLoading || stocksData.length === 0) return null;

  return (
    <div
      className="sm:hidden border-b border-slate-200 bg-white cursor-pointer"
      onClick={onOpenWatchlist}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex-shrink-0">
          Watchlist
        </span>
        <span className="text-[10px] font-medium text-slate-300 flex-shrink-0">
          {stocksData.length}
        </span>
        <i className="fa-solid fa-chevron-right text-[8px] text-slate-300 flex-shrink-0"></i>
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-3 pb-2.5 -mt-0.5">
        {stocksData.map((stock, i) => (
          <div
            key={stock.name + "-" + i}
            className="flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 min-w-[85px] active:bg-slate-100 transition-colors"
          >
            <span className="text-[10px] font-bold text-slate-700 truncate w-full text-center">
              {stock.name}
            </span>
            <span className="text-[10px] font-semibold text-slate-600 mt-0.5">
              ₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span
              className={`text-[9px] font-medium flex items-center gap-0.5 mt-0.5 ${
                stock.isDown ? "text-red-500" : "text-emerald-500"
              }`}
            >
              {stock.percent}
              <i
                className={`fa-solid text-[7px] ${
                  stock.isDown ? "fa-caret-down" : "fa-caret-up"
                }`}
              ></i>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileWatchlistBar;
