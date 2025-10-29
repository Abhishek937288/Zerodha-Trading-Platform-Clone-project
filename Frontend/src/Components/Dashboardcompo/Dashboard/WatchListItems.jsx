import React, { useState } from "react";
import { HoverCard } from "radix-ui";
import BuyAction from "./BuyAction";
import SellAction from "./SellAction";

import StockChart from "./StockChart";
import { DropdownMenu } from "@radix-ui/themes";

import WatchListCharts from "./WatchListCharts";
const WatchListItems = ({ stock }) => {
  const [open, setOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);

  return (
    <HoverCard.Root
      open={open}
      onOpenChange={(state) => {
        if (state) {
          setOpen(true);
        } else if (!state && !popoverOpen) {
          setOpen(false);
        }
      }}
    >
      <HoverCard.Trigger asChild>
        <li className=" hover:bg-slate-50 h-10 cursor-pointer border-b border-b-slate-100">
          <div className="flex justify-between items-center px-4">
            <p
              className={` text-md max-sm:text-sm  text-center px-3 ${
                stock.isDown ? "text-red-500" : "text-green-400"
              }`}
            >
              {stock.name}
            </p>

            <div className="sm:hidden"><DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button>...</button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  onClick={() => {
                    setBuyOpen(true);
                  }}
                >
                  Buy
                </DropdownMenu.Item>

                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  onClick={() => {
                    setSellOpen(true);
                  }}
                >
                  sell
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  onClick={() => {
                    setChartOpen(true);
                  }}
                >
                  stockChart
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root></div>

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
      </HoverCard.Trigger>

      <HoverCard.Content
        side="top"
        sideOffset={3}
        className="select-none rounded px-full lg:px-20 py-4 text-sm leading-none text-violet11 shadow-md absolute top-0 left-0 w-full h-full flex items-center justify-center will-change-transform  "
      >
        <div className="flex items-center gap-2">
          <BuyAction
            popoverOpen={buyOpen}
            setPopoverOpen={setBuyOpen}
            stock={stock}
            setOpen={setOpen}
          />

          <SellAction
            popoverOpen={sellOpen}
            setPopoverOpen={setSellOpen}
            stock={stock}
            setOpen={setOpen}
          />

          <StockChart
            popoverOpen={chartOpen}
            setPopoverOpen={setChartOpen}
            stock={stock}
            setOpen={setOpen}
          />
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default WatchListItems;
