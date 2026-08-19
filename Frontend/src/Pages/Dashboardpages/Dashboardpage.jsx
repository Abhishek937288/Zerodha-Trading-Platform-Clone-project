import Summary from "@/Components/Dashboardcompo/Dashboard/Summary";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getHoldings, getPositions } from "@/Mutation/stockMutationFn.js";
import HoldingsCharts from "@/Components/Dashboardcompo/Dashboard/HoldingsCharts";
import { Skeleton } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

const fmt = (num) => {
  if (num === null || num === undefined) return "₹0.00";
  return Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Dashboardpage = () => {
  const navigate = useNavigate();

  const { data: holdings, isPending: holdingsLoading } = useQuery({
    queryKey: ["stocks"],
    queryFn: getHoldings,
  });

  const { data: positions } = useQuery({
    queryKey: ["positions"],
    queryFn: getPositions,
  });

  const displayHoldings = holdings?.slice(0, 5) || [];
  const totalHoldingsPnl = holdings?.reduce((acc, h) => {
    return acc + (h.price - h.avg) * h.qty;
  }, 0) || 0;

  return (
    <div className="space-y-0">
      <Summary />

      <div className="px-4 sm:px-6 pb-4">
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                <i className="fa-solid fa-layer-group text-blue-500 text-[10px]"></i>
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-slate-700">
                Holdings
              </h3>
              {holdings?.length > 0 && (
                <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">
                  {holdings.length}
                </span>
              )}
            </div>
            {holdings?.length > 5 && (
              <button
                onClick={() => navigate("/Dashboard/Holdingspage")}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                View All <i className="fa-solid fa-arrow-right text-[8px] ml-0.5"></i>
              </button>
            )}
          </div>

          {holdingsLoading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton width="80px" height="16px" />
                  <Skeleton width="60px" height="16px" />
                </div>
              ))}
            </div>
          ) : displayHoldings.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <i className="fa-solid fa-inbox text-slate-400 text-lg"></i>
              </div>
              <p className="text-sm text-slate-500">No holdings yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Buy stocks from the watchlist to get started
              </p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-slate-100">
                {displayHoldings.map((stock, idx) => {
                  const currVal = stock.price * stock.qty;
                  const pnl = (stock.price - stock.avg) * stock.qty;
                  const pnlPercent =
                    stock.avg > 0
                      ? (((stock.price - stock.avg) / stock.avg) * 100).toFixed(2)
                      : "0.00";
                  const isProfit = pnl >= 0;

                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50/80 transition-colors"
                    >
                      <div className="flex flex-col min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-slate-700 truncate">
                          {stock.name}
                        </p>
                        <p className="text-[10px] sm:text-xs text-slate-400">
                          {stock.qty} shares @ ₹{fmt(stock.avg)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-slate-500">Current</p>
                          <p className="text-xs font-medium text-slate-700">
                            ₹{fmt(stock.price)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-xs sm:text-sm font-semibold ${
                              isProfit ? "text-emerald-600" : "text-red-500"
                            }`}
                          >
                            {isProfit ? "+" : ""}₹{fmt(Math.abs(pnl))}
                          </p>
                          <p
                            className={`text-[10px] sm:text-xs ${
                              isProfit ? "text-emerald-500" : "text-red-400"
                            }`}
                          >
                            {isProfit ? "+" : ""}
                            {pnlPercent}%
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {holdings.length > 0 && (
                <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Total P&L
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        totalHoldingsPnl >= 0
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {totalHoldingsPnl >= 0 ? "+" : ""}₹
                      {fmt(Math.abs(totalHoldingsPnl))}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/Dashboard/Holdingspage")}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium sm:hidden"
                  >
                    View All <i className="fa-solid fa-arrow-right text-[8px] ml-0.5"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {holdings?.length > 0 && (
        <div className="px-4 sm:px-6 pb-6">
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm sm:text-base font-semibold text-slate-700">
                Portfolio Distribution
              </h3>
            </div>
            <div className="p-4">
              <HoldingsCharts holdings={holdings} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboardpage;
