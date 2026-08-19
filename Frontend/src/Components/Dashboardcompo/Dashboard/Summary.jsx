import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/Mutation/stockMutationFn.js";
import { Skeleton } from "@radix-ui/themes";
import { userAuthstore } from "@/Store/authStore";

const fmt = (num) => {
  if (num === null || num === undefined) return "₹0.00";
  return Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Summary = () => {
  const { user } = userAuthstore();
  const { data, isPending, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    staleTime: 0,
  });

  if (isPending) {
    return (
      <div className="p-4 sm:p-6 space-y-4">
        <Skeleton width="180px" height="28px" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4">
              <Skeleton width="80px" height="14px" />
              <Skeleton width="120px" height="32px" className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p className="text-sm">Failed to load dashboard: {error.message}</p>
      </div>
    );
  }

  const pnl = data.pnl || 0;
  const pnlPercent = data.pnlPercent || "0.00";
  const isProfit = pnl >= 0;
  const pnlColor = isProfit ? "text-emerald-600" : "text-red-500";
  const pnlBg = isProfit ? "bg-emerald-50" : "bg-red-50";
  const pnlIcon = isProfit ? "fa-caret-up" : "fa-caret-down";

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex items-center gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
          Welcome back{user?.username ? `, ${user.username}` : ""}
        </h2>
        <span className="text-lg">
          <i className="fa-solid fa-hand-wave text-amber-400"></i>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
          <p className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
            Portfolio Value
          </p>
          <p className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            ₹{fmt(data.currentValue)}
          </p>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
            Current market value
          </p>
        </div>

        <div className={`border rounded-xl p-4 hover:shadow-md transition-shadow ${isProfit ? "border-emerald-200 bg-emerald-50/50" : "border-red-200 bg-red-50/50"}`}>
          <p className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
            Total P&L
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className={`text-xl sm:text-2xl font-bold ${pnlColor}`}>
              {isProfit ? "+" : ""}₹{fmt(Math.abs(pnl))}
            </p>
            <span className={`text-xs sm:text-sm font-semibold ${pnlColor} ${pnlBg} px-1.5 py-0.5 rounded`}>
              <i className={`fa-solid ${pnlIcon} text-[8px]`}></i>{" "}
              {isProfit ? "+" : ""}
              {pnlPercent}%
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
            {isProfit ? "Your portfolio is in profit" : "Your portfolio is at a loss"}
          </p>
        </div>

        <div className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
          <p className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
            Invested
          </p>
          <p className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            ₹{fmt(data.investment)}
          </p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-[10px] sm:text-xs text-slate-400">
              Total investment
            </p>
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
          <p className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
            Available Margin
          </p>
          <p className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            ₹{fmt(data.marginAvailable)}
          </p>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
            Available for trading
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
              <i className="fa-solid fa-layer-group text-blue-500 text-[10px]"></i>
            </span>
            <p className="text-xs font-medium text-slate-500">Holdings</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {data.holdingsCount}
          </p>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
            Active positions
          </p>
        </div>

        {data.topGainer ? (
          <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                <i className="fa-solid fa-arrow-trend-up text-emerald-600 text-[10px]"></i>
              </span>
              <p className="text-xs font-medium text-emerald-700">Top Gainer</p>
            </div>
            <p className="text-lg font-bold text-slate-800">{data.topGainer.name}</p>
            <p className="text-sm font-semibold text-emerald-600 mt-0.5">
              +₹{fmt(data.topGainer.profit)}
            </p>
          </div>
        ) : (
          <div className="border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                <i className="fa-solid fa-arrow-trend-up text-slate-400 text-[10px]"></i>
              </span>
              <p className="text-xs font-medium text-slate-500">Top Gainer</p>
            </div>
            <p className="text-sm text-slate-400">No data</p>
          </div>
        )}

        {data.topLoser ? (
          <div className="border border-red-200 bg-red-50/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                <i className="fa-solid fa-arrow-trend-down text-red-500 text-[10px]"></i>
              </span>
              <p className="text-xs font-medium text-red-600">Top Loser</p>
            </div>
            <p className="text-lg font-bold text-slate-800">{data.topLoser.name}</p>
            <p className="text-sm font-semibold text-red-500 mt-0.5">
              -₹{fmt(Math.abs(data.topLoser.loss))}
            </p>
          </div>
        ) : (
          <div className="border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                <i className="fa-solid fa-arrow-trend-down text-slate-400 text-[10px]"></i>
              </span>
              <p className="text-xs font-medium text-slate-500">Top Loser</p>
            </div>
            <p className="text-sm text-slate-400">No data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
