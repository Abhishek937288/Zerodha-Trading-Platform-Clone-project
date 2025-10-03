import React, { useState } from "react";
import { Popover } from "@radix-ui/themes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addFunds, getFunds } from "@/Mutation/fundsMutation.js";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@radix-ui/themes";

const Fundspage = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    amount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: +value,
    }));
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["stocks"],
    queryFn: getFunds,
  });

  const mutation = useMutation({
    mutationFn: addFunds,
    onSuccess: (res) => {
      setFormData({
        amount: 0,
      });
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
      setFormData({
        amount: 0,
      });
    },
  });

  if (isPending) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 mt-10 grid-cols-1 gap-10">
          <div className="rounded-2xl sm:w-[20vw] w-[80vw] border p-4 shadow-sm">
            <Skeleton width="120px" height="16px" />
            <Skeleton width="100px" height="28px" className="mt-3" />
          </div>

          <div className="rounded-2xl sm:w-[20vw] w-[80vw] border p-4 shadow-sm">
            <Skeleton width="140px" height="16px" />
            <Skeleton width="100px" height="28px" className="mt-3" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>error: {error.message}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {data.map((fund, idx) => {
        return (
          <div
            className="grid md:grid-cols-2    mt-10  grid-cols-1 gap-10"
            key={idx}
          >
            <div className="rounded-2xl sm:w-[20vw] w-[80vw]   border p-4 shadow-sm">
              <p className="text-sm text-gray-500">Total Funds Available</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{fund.totalAmount}
              </p>
            </div>

            <div className="rounded-2xl sm:w-[20vw] w-[80vw]   border p-4 shadow-sm">
              <p className="text-sm text-gray-500">Total Investment</p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{fund.investedAmount}
              </p>
            </div>
          </div>
        );
      })}

      <div className="mt-10">
        <Popover.Root>
          <Popover.Trigger>
            <button className="px-5 py-2 cursor-pointer font-semibold bg-green-700 text-white rounded-lg">
              {" "}
              Add Fund
            </button>
          </Popover.Trigger>
          <Popover.Content className="h-40 w-80 max-sm:w-[90vw]  flex justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate(formData);
              }}
              action=""
              className="flex flex-col gap-8 items-center "
            >
              <input
                type="number"
                placeholder="Enter amount"
                className="border border-blue-600  text-center w-40 rounded-lg py-2"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
              <button className="bg-blue-700 w-20 cursor-pointer  text-white font-semibold rounded-md h-8 ">
                Submit
              </button>
            </form>
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  );
};

export default Fundspage;
