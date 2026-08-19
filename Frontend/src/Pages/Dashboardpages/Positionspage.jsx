import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPositions } from "@/Mutation/stockMutationFn.js";
import { Skeleton } from "@radix-ui/themes";
import EmptyState from "@/Components/Dashboardcompo/Common/EmptyState";
import PositionsCharts from "@/Components/Dashboardcompo/Dashboard/PositionsCharts";

const fmt = (num) => {
  if (num === null || num === undefined) return "₹0.00";
  return Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const fmtPct = (num) => {
  if (num === null || num === undefined) return "0.00%";
  return `${num >= 0 ? "+" : ""}${Number(num).toFixed(2)}%`;
};

const Positionspage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["positions"],
    queryFn: getPositions,
  });
  const [filter, setFilter] = useState("ALL");

  if (isPending) {
    return (
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton width="160px" height="28px" />
          <Skeleton width="60px" height="20px" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-3">
              <Skeleton width="80px" height="12px" />
              <Skeleton width="100px" height="22px" className="mt-2" />
            </div>
          ))}
        </div>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-4 px-4 py-3 border-t border-slate-100">
              <Skeleton width="50px" height="14px" />
              <Skeleton width="100px" height="16px" />
              <Skeleton width="40px" height="14px" />
              <Skeleton width="60px" height="14px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p className="text-sm">Failed to load positions: {error.message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No open positions"
        description="Your intraday and MTF positions will appear here. Start trading to see your positions."
        actionLabel="Start Trading"
        actionLink="/Dashboard/Dashboardpage"
      />
    );
  }

  const calcPosition = (pos) => {
    const qty = pos.qty ?? 0;
    const avg = pos.avg ?? 0;
    const price = pos.price ?? 0;
    const prevClose = pos.prevClose ?? avg;
    const investedValue = avg * qty;
    const currentValue = price * qty;
    const pnl = currentValue - investedValue;
    const pnlPct = investedValue > 0 ? ((currentValue - investedValue) / investedValue) * 100 : 0;
    const dayChangeVal = (price - prevClose) * qty;
    const dayChangePct = prevClose > 0 ? ((price - prevClose) / prevClose) * 100 : 0;
    return { qty, avg, price, investedValue, currentValue, pnl, pnlPct, dayChangeVal, dayChangePct };
  };

  const enriched = data.map((pos) => ({ ...pos, _calc: calcPosition(pos) }));

  const totalPnl = enriched.reduce((s, p) => s + p._calc.pnl, 0);
  const totalDayChange = enriched.reduce((s, p) => s + p._calc.dayChangeVal, 0);
  const totalInvested = enriched.reduce((s, p) => s + p._calc.investedValue, 0);
  const totalCurrent = enriched.reduce((s, p) => s + p._calc.currentValue, 0);

  const filtered =
    filter === "ALL"
      ? enriched
      : filter === "BUY"
      ? enriched.filter((p) => p.product === "MIS" || p.product === "CNC")
      : enriched.filter((p) => p.product === "NRML" || p.product === "MIS");

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-slate-800">Positions</h2>
          <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">
            {data.length}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-0.5">
          {["ALL", "MIS", "NRML"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                filter === f
                  ? f === "MIS"
                    ? "bg-blue-500 text-white shadow-sm"
                    : f === "NRML"
                    ? "bg-violet-500 text-white shadow-sm"
                    : "bg-white text-slate-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="border border-slate-200 rounded-xl p-3">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total Invested</p>
          <p className="text-lg font-bold text-slate-800 mt-0.5">₹{fmt(totalInvested)}</p>
        </div>
        <div className="border border-slate-200 rounded-xl p-3">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Current Value</p>
          <p className="text-lg font-bold text-slate-800 mt-0.5">₹{fmt(totalCurrent)}</p>
        </div>
        <div className={`border rounded-xl p-3 ${totalPnl >= 0 ? "border-emerald-200 bg-emerald-50/30" : "border-red-200 bg-red-50/30"}`}>
          <p className={`text-[10px] font-medium uppercase tracking-wider ${totalPnl >= 0 ? "text-emerald-600" : "text-red-500"}`}>P&L</p>
          <p className={`text-lg font-bold mt-0.5 ${totalPnl >= 0 ? "text-emerald-600" : "text-red-500"}`}>
            {totalPnl >= 0 ? "+" : ""}₹{fmt(totalPnl)}
          </p>
        </div>
        <div className={`border rounded-xl p-3 ${totalDayChange >= 0 ? "border-emerald-200 bg-emerald-50/30" : "border-red-200 bg-red-50/30"}`}>
          <p className={`text-[10px] font-medium uppercase tracking-wider ${totalDayChange >= 0 ? "text-emerald-600" : "text-red-500"}`}>Day P&L</p>
          <p className={`text-lg font-bold mt-0.5 ${totalDayChange >= 0 ? "text-emerald-600" : "text-red-500"}`}>
            {totalDayChange >= 0 ? "+" : ""}₹{fmt(totalDayChange)}
          </p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="text-left text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5">Product</th>
                <th className="text-left text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5">Instrument</th>
                <th className="text-right text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5">Qty</th>
                <th className="text-right text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5 hidden sm:table-cell">Avg Price</th>
                <th className="text-right text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5">LTP</th>
                <th className="text-right text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5">P&L</th>
                <th className="text-right text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5 hidden md:table-cell">Day Chg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((pos, idx) => {
                const c = pos._calc;
                const isProfit = c.pnl >= 0;
                const isDayUp = c.dayChangePct >= 0;
                const productColors = {
                  MIS: { bg: "bg-blue-100", text: "text-blue-700" },
                  NRML: { bg: "bg-violet-100", text: "text-violet-700" },
                  CNC: { bg: "bg-amber-100", text: "text-amber-700" },
                };
                const pc = productColors[pos.product] || { bg: "bg-slate-100", text: "text-slate-600" };

                return (
                  <tr key={pos._id || idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wide ${pc.bg} ${pc.text}`}>
                        {pos.product}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">{pos.name}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs sm:text-sm font-medium text-slate-700">{c.qty}</span>
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell">
                      <span className="text-xs sm:text-sm text-slate-600">₹{fmt(c.avg)}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs sm:text-sm font-medium text-slate-800">₹{fmt(c.price)}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex flex-col items-end">
                        <span className={`text-xs sm:text-sm font-semibold ${isProfit ? "text-emerald-600" : "text-red-500"}`}>
                          {isProfit ? "+" : ""}₹{fmt(c.pnl)}
                        </span>
                        <span className={`text-[10px] ${isProfit ? "text-emerald-400" : "text-red-400"}`}>
                          {fmtPct(c.pnlPct)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right hidden md:table-cell">
                      <div className="flex flex-col items-end">
                        <span className={`text-xs font-semibold ${isDayUp ? "text-emerald-600" : "text-red-500"}`}>
                          {isDayUp ? "+" : ""}{fmtPct(c.dayChangePct)}
                        </span>
                        <span className={`text-[10px] ${isDayUp ? "text-emerald-400" : "text-red-400"}`}>
                          {isDayUp ? "+" : ""}₹{fmt(Math.abs(c.dayChangeVal))}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-400">No {filter} positions found</p>
          </div>
        )}
      </div>

      <div className="border border-slate-200 rounded-xl p-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Position Distribution</h3>
        <PositionsCharts positions={data} />
      </div>
    </div>
  );
};

export default Positionspage;
