import React, { useState, useRef } from "react";
import { Popover } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sellStock } from "@/Mutation/stockMutationFn";
import { useClickOutside } from "@/hooks/useOutsideClick";
import useIsMobile from "@/hooks/useMobile";

const SellAction = ({ stock, setOpen, popoverOpen, setPopoverOpen }) => {
  const isMobile = useIsMobile();
  const popOverRef = useRef();
  const queryClient = useQueryClient();

  const [stockData, setStockData] = useState({
    name: "",
    price: "",
    qty: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setStockData((prev) => ({
      ...prev,
      [name]: name === "qty" ? Number(value) : value,
      name: stock.name,
      price: stock.price,
    }));
  };

  const closePopover = () => {
    setPopoverOpen(false);
  };

  useClickOutside(popOverRef, closePopover);

  const mutation = useMutation({
    mutationFn: sellStock,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      setPopoverOpen(false);
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  return (
    <Popover.Root
      open={popoverOpen}
      onOpenChange={(state) => {
        if (!isMobile) {
          setPopoverOpen(state);
        }
        if (state === false) {
          setOpen(false);
        }
      }}
    >
      <Popover.Trigger>
        <div>
          <button className="max-sm:hidden bg-green-700 cursor-pointer text-white text-xs rounded-lg px-3 py-1 hidden md:block">
            sell
          </button>
        </div>
      </Popover.Trigger>

      <Popover.Content ref={popOverRef} className="sm:w-80 w-60 sm:h-40">
        <form className="w-full flex flex-col items-center gap-4">
          <h3 className="text-xl font-semibold text-green-700">Sell</h3>
          <div className="flex max-sm:flex-col gap-5">
            <input
              type="number"
              placeholder="qty"
              className="w-20 text-center border border-green-400"
              name="qty"
              value={stockData.qty}
              onChange={handleOnChange}
            />
            <p className="text-center">price {stock.price}</p>
            <p className="text-center">= {stock.price * stockData.qty}rs</p>
          </div>

          <Popover.Close>
            <Button
              size="1"
              onClick={() => {
                mutation.mutate(stockData);
                if (isMobile) {
                  setPopoverOpen(false);
                }
              }}
            >
              Submit
            </Button>
          </Popover.Close>
        </form>
      </Popover.Content>
    </Popover.Root>
  );
};

export default SellAction;
