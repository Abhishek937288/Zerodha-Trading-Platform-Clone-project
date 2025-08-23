import { assets } from "@/assets/assets";
import React from "react";

const Brokerage = () => {
  return (
    <div className="mt-20 container px-5 md:px-20">
      <div className=" flex flex-col items-center justify-center gap-3">
        <h3 className="text-2xl  font-semibold opacity-80">Charges</h3>
        <p className="text-xl opacity-80 text-center">
          List of all charges and taxes
        </p>
      </div>
      <div className="grid mt-30 md:grid-cols-2 lg:grid-cols-3 gap-20 md:mx-auto">
        <div className="flex flex-col items-center justify-center gap-5">
          <img src={assets.pricingO} className="w-[80%]" alt="" />
          <p className="text-2xl text-center font-semibold opacity-80">
            Free equity delivery
          </p>
          <p className="text-lg opacity-80 text-center">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <img src={assets.intradayTrades} className="w-[80%]" alt="" />
          <p className="text-2xl text-center font-semibold opacity-80">
            Intraday and F&O trades
          </p>
          <p className="text-lg opacity-80 text-center">
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <img src={assets.pricingO} className="w-[80%]" alt="" />
          <p className="text-2xl text-center font-semibold opacity-80">
            Free direct MF
          </p>
          <p className="text-lg opacity-80 text-center">
            All direct mutual fund investments are absolutely free — ₹ 0
            commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Brokerage;
