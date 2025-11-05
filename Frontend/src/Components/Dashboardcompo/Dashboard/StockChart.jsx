import React, { useRef } from "react";
import { Popover } from "@radix-ui/themes";
import StockProgress from "./StockProgress";
import { useClickOutside } from "@/hooks/useOutsideClick";
import useIsMobile from "@/hooks/useMobile";

const StockChart = ({ stock, setOpen, popoverOpen, setPopoverOpen }) => {
  const isMobile = useIsMobile();
  const popOverRef = useRef();

  const closePopover = () => {
    setPopoverOpen(false);
  };

  useClickOutside(popOverRef, closePopover);

  return (
    <Popover.Root
      open={popoverOpen}
      onOpenChange={(state) => {
        if (!isMobile) {
          setPopoverOpen(state);
        }
        if (!state) {
          setOpen(false);
        }
      }}
    >
      <Popover.Trigger>
        <div>
          <button className="max-sm:hidden bg-transparent text-black text-xs rounded-lg px-3 py-1 cursor-pointer hidden md:block">
            <i className="fa-solid fa-chart-simple"></i>
          </button>
        </div>
      </Popover.Trigger>

      <Popover.Content
        ref={popOverRef}
        className="w-60 sm:w-80 h-40 sm:h-48 p-4 flex justify-center items-center"
        style={{ maxWidth: "90vw" }}
      >
        <StockProgress stock={stock} />
      </Popover.Content>
    </Popover.Root>
  );
};

export default StockChart;
