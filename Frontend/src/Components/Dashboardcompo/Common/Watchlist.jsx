import React from "react";
import { watchlist } from "@/data/data";
import Topbar from "../Dashboard/Topbar";
import WatchListItems from "../Dashboard/WatchListItems";
import { Tooltip } from "radix-ui";

const Watchlist = () => {
  return (
    <div className="container h-[100vh]  sticky left-0  ">
      <Topbar />
      <div className="border-r   border-r-slate-300 h-full   overflow-auto scrollbar-hide">
        <div className="w-full flex  px-3 gap-2 border-b  border-b-slate-300 items-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search eg:infy bse nifty  fut weekly, gold mcx "
            className=" text-center text-xs sm:text-sm h-10 w-full opacity-80"
          />
          <span className="text-center text-xs sm:text-sm opacity-80">
            {watchlist.length}/50
          </span>
        </div>
        <ul>
          <div className="flex flex-col mt-3 gap-3">
            {watchlist.map((stock, index) => {
              return (
                <div className="" key={index}>
                  <WatchListItems stock={stock} key={index} />
                </div>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Watchlist;
