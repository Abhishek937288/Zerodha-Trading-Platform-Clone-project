import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/Mutation/stockMutationFn.js";

const Summary = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    staleTime: 0,
  });
  if (isPending) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>error : {error.message}</p>;
  }

  const holdings = data.holdings.length
  console.log(data);
  return (
    <div className=" container h-[80vh] grid grid-rows-5 px-5 sm:px-5">
      <div className="row-span-1  border-b border-b-slate-400 flex  items-baseline-last">
        <p className="pb-5  text-md sm:text-lg">Hi, User!</p>
      </div>

      <div className="row-span-2 w-full border-b border-b-slate-400 flex items-baseline-last  max-sm:text-center max-sm:gap-10 ">
        <div className="pb-5 w-25 flex flex-col gap-10">
          <p className="sm:text-lg      opacity-80">Equity</p>
          <div className="">
            <p className="sm:text-2xl text-lg opacity-80">{data.marginAvailable}</p>
            <p className="sm:text-sm  text-xs opacity-80">Margin Available</p>
          </div>
        </div>
        <div className=" flex flex-col w-full  items-center justify-center max-sm:mr-25 ">
          <p className="sm:text-sm  text-xs text-center opacity-80">
            Margin Used
          </p>
          <p className="sm:text-sm  text-xs text-center opacity-80">
            Oepning Balance {data.marginAvailable}
          </p>
        </div>
      </div>
      <div className="row-span-2 flex items-baseline-last max-sm:gap-5 ">
        <div className="flex pb-5 flex-col gap-20">
          <p className="sm:text-lg  opacity-80">Holdings({holdings})</p>
          <div className="flex  items-center">
            <p className="sm:text-2xl text-xl text-green-400 opacity-80">
              {data.pnl}
            </p>
            <p className="text-sm opacity-80">{data.pnlPercent}</p>
          </div>
        </div>
        <div className="max-sm:flex flex-col w-full  items-center justify-center max-sm:mr-25">
          <p className="sm:text-sm  text-xs text-center opacity-80">
            current value {data.currentValue}
          </p>
          <p className="sm:text-sm  text-xs text-center opacity-80">
            Investment {data.investment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
