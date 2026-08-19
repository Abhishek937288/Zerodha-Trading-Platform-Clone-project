import React, { useState } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { DropdownMenu } from "@radix-ui/themes";
import useIsMobile from "@/hooks/useMobile";
import BuyAction from "./BuyAction";
import SellAction from "./SellAction";
import StockChart from "./StockChart";


const WatchListItems = ({ stock }) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        <li className="hover:bg-slate-50/80 cursor-pointer border-b border-slate-100 transition-colors duration-150">
          <div className="flex justify-between items-center px-4 py-2.5">
            <div className="flex flex-col">
              <p
                className={`text-xs sm:text-sm font-semibold ${
                  stock.isDown ? "text-red-500" : "text-emerald-500"
                }`}
              >
                {stock.name}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="sm:hidden">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <button className="text-slate-400 hover:text-slate-600 transition-colors px-1">
                      <i className="fa-solid fa-ellipsis-vertical text-xs"></i>
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item
                      onClick={(e) => {
                        setBuyOpen(true);
                      }}
                    >
                      Buy
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item onClick={() => setSellOpen(true)}>
                      Sell
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item onClick={() => setChartOpen(true)}>
                      Stock Chart
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] sm:text-xs font-medium flex items-center gap-1 ${
                    stock.isDown ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  {stock.percent}
                  {stock.isDown ? (
                    <i className="fa-solid text-[8px] sm:text-[10px] fa-caret-down"></i>
                  ) : (
                    <i className="fa-solid text-[8px] sm:text-[10px] fa-caret-up"></i>
                  )}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 min-w-[60px] text-right">
                  ₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </li>
        <div>
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
      </>
    );
  }
  //  desktop view (hover works)
  return (
    <HoverCard.Root open={open} onOpenChange={(state) => setOpen(state)}>
      <HoverCard.Trigger asChild>
        <li className="hover:bg-slate-50/80 cursor-pointer border-b border-slate-100 transition-colors duration-150">
          <div className="flex justify-between items-center px-4 py-2.5">
            <p
              className={`text-xs sm:text-sm font-semibold ${
                stock.isDown ? "text-red-500" : "text-emerald-500"
              }`}
            >
              {stock.name}
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <span
                className={`text-[10px] sm:text-xs font-medium flex items-center gap-1 min-w-[70px] justify-end ${
                  stock.isDown ? "text-red-500" : "text-emerald-500"
                }`}
              >
                {stock.percent}
                {stock.isDown ? (
                  <i className="fa-solid text-[8px] sm:text-[10px] fa-caret-down"></i>
                ) : (
                  <i className="fa-solid text-[8px] sm:text-[10px] fa-caret-up"></i>
                )}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 min-w-[70px] text-right">
                ₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </li>
      </HoverCard.Trigger>

      <HoverCard.Content
        side="top"
        sideOffset={3}
        className="select-none rounded-lg px-4 lg:px-12 py-3 text-sm leading-none shadow-lg border border-slate-200 absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/95 backdrop-blur-sm"
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
