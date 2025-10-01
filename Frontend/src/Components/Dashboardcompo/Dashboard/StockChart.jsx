import { Popover } from "@radix-ui/themes";
import StockProgress from "./StockProgress";

const StockChart = ({ stock, setOpen, popoverOpen, setPopoverOpen }) => {
  console.log(stock);

  return (
    <Popover.Root
      open={popoverOpen}
      onOpenChange={(state) => {
        setPopoverOpen(state);
        if (!state) setOpen(false);
      }}
    >
      <Popover.Trigger>
        <button className="bg-transparent text-black text-xs rounded-lg px-3 py-1 cursor-pointer">
          <i className="fa-solid fa-chart-simple"></i>
        </button>
      </Popover.Trigger>

      <Popover.Content
        className="w-60 sm:w-80 h-40 sm:h-48 p-4 flex justify-center items-center"
        style={{ maxWidth: "90vw" }}
      >
        <StockProgress stock={stock} />
      </Popover.Content>
    </Popover.Root>
  );
};

export default StockChart;
