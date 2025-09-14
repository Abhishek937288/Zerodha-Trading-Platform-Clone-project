import React, { use } from "react";
import { useState } from "react";
import { Tooltip } from "radix-ui";

const WatchListItems = ({ stock }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <li className="hover:bg-slate-200 h-10 cursor-pointer border-b border-b-slate-100">
            <div className="flex justify-between items-center px-4">
              <p
                className={` text-md max-sm:text-sm  text-center px-3 ${
                  stock.isDown ? "text-red-500" : "text-green-400"
                }`}
              >
                {stock.name}
              </p>
              <div className="flex gap-2  items-center">
                <span className="text-xs flex items-center gap-2 text-center ">
                  {stock.percent}
                  {stock.isDown ? (
                    <i className="fa-solid text-red-500  text-xs fa-angle-down"></i>
                  ) : (
                    <i className="fa-solid  text-green-400 text-xs fa-angle-up"></i>
                  )}
                </span>
                <span className="text-xs text-center">{stock.price}</span>
              </div>
            </div>
          </li>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            sideOffset={3}
            className="select-none rounded px-full sm:px-20 py-4 text-sm leading-none text-violet11 shadow-md absolute top-0 left-0 w-full h-full flex items-center justify-center will-change-transform  "
          >
            <div className="flex items-center gap-2">
              <button className="bg-blue-700 text-white text-xs rounded-lg px-3 py-1">
                buy
              </button>
              <button className="bg-green-700 text-white text-xs rounded-lg px-3 py-1">
                sell
              </button>
              <button className="bg-transparent text-black text-xs rounded-lg px-3 py-1">
                <i class="fa-solid fa-chart-simple"></i>
              </button>
            </div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default WatchListItems;
