import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHoldings } from "@/Mutation/stockMutationFn.js";
import { Skeleton } from "@radix-ui/themes";
import EmptyState from "@/Components/Dashboardcompo/Common/EmptyState";
import HoldingsCharts from "@/Components/Dashboardcompo/Dashboard/HoldingsCharts";

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

const Holdingspage = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["stocks"],
    queryFn: getHoldings,
  });
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  if (isPending) {
    return (
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton width="140px" height="28px" />
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
              <Skeleton width="100px" height="16px" />
              <Skeleton width="40px" height="14px" />
              <Skeleton width="60px" height="14px" />
              <Skeleton width="60px" height="14px" />
              <Skeleton width="70px" height="14px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p className="text-sm">Failed to load holdings: {error.message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No holdings yet"
        description="Start building your portfolio! Your holdings will appear here once you buy your first stock from the dashboard."
        actionLabel="Start Trading"
        actionLink="/Dashboard/Dashboardpage"
      />
    );
  }

  const calcHolding = (stock) => {
    const qty = stock.qty ?? 0;
    const avg = stock.avg ?? 0;
    const price = stock.price ?? 0;
    const prevClose = stock.prevClose ?? avg;
    const investedValue = avg * qty;
    const currentValue = price * qty;
    const pnl = currentValue - investedValue;
    const pnlPct = investedValue > 0 ? ((currentValue - investedValue) / investedValue) * 100 : 0;
    const dayChangeVal = (price - prevClose) * qty;
    const dayChangePct = prevClose > 0 ? ((price - prevClose) / prevClose) * 100 : 0;
    return { qty, avg, price, investedValue, currentValue, pnl, pnlPct, dayChangeVal, dayChangePct };
  };

  const enriched = data.map((stock) => ({ ...stock, _calc: calcHolding(stock) }));

  const totalInvested = enriched.reduce((s, h) => s + h._calc.investedValue, 0);
  const totalCurrent = enriched.reduce((s, h) => s + h._calc.currentValue, 0);
  const totalPnl = totalCurrent - totalInvested;
  const totalPnlPct = totalInvested > 0 ? ((totalCurrent - totalInvested) / totalInvested) * 100 : 0;
  const totalDayChange = enriched.reduce((s, h) => s + h._calc.dayChangeVal, 0);

  const sorted = [...enriched];
  if (sortKey) {
    sorted.sort((a, b) => {
      const va = a._calc[sortKey] ?? 0;
      const vb = b._calc[sortKey] ?? 0;
      return sortDir === "asc" ? va - vb : vb - va;
    });
  }

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ active, dir }) => (
    <span className="inline-block ml-1">
      <i className={`fa-solid ${active ? (dir === "asc" ? "fa-sort-up text-orange-500" : "fa-sort-down text-orange-500") : "fa-sort text-slate-300"} text-[8px]`}></i>
    </span>
  );

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-slate-800">Holdings</h2>
        <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">
          {data.length}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="border border-slate-200 rounded-xl p-3">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Invested</p>
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
          <p className={`text-[10px] mt-0.5 ${totalPnlPct >= 0 ? "text-emerald-500" : "text-red-400"}`}>
            {fmtPct(totalPnlPct)}
          </p>
        </div>
        <div className={`border rounded-xl p-3 ${totalDayChange >= 0 ? "border-emerald-200 bg-emerald-50/30" : "border-red-200 bg-red-50/30"}`}>
          <p className={`text-[10px] font-medium uppercase tracking-wider ${totalDayChange >= 0 ? "text-emerald-600" : "text-red-500"}`}>Day Change</p>
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
                {[
                  { key: "name", label: "Instrument", cls: "text-left" },
                  { key: "qty", label: "Qty", cls: "text-right" },
                  { key: "avg", label: "Avg Cost", cls: "text-right hidden sm:table-cell" },
                  { key: "price", label: "LTP", cls: "text-right" },
                  { key: "currentValue", label: "Current Value", cls: "text-right" },
                  { key: "pnl", label: "P&L", cls: "text-right" },
                  { key: "pnlPct", label: "P&L %", cls: "text-right" },
                  { key: "dayChangePct", label: "Day Chg", cls: "text-right hidden md:table-cell" },
                ].map((col) => (
                  <th
                    key={col.key}
                    className={`${col.cls} text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5`}
                  >
                    {col.label}
                    {!["name"].includes(col.key) && (
                      <SortIcon active={sortKey === col.key} dir={sortDir} />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.map((stock, idx) => {
                const c = stock._calc;
                const isProfit = c.pnl >= 0;
                const isDayUp = c.dayChangePct >= 0;
                return (
                  <tr key={stock._id || idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">{stock.name}</span>
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
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">₹{fmt(c.currentValue)}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-xs sm:text-sm font-semibold ${isProfit ? "text-emerald-600" : "text-red-500"}`}>
                        {isProfit ? "+" : ""}₹{fmt(c.pnl)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold ${isProfit ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                        <i className={`fa-solid ${isProfit ? "fa-caret-up" : "fa-caret-down"} text-[8px]`}></i>
                        {fmtPct(c.pnlPct)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right hidden md:table-cell">
                      <div className="flex flex-col items-end">
                        <span className={`text-[10px] sm:text-xs font-semibold ${isDayUp ? "text-emerald-600" : "text-red-500"}`}>
                          {isDayUp ? "+" : ""}{fmtPct(c.dayChangePct)}
                        </span>
                        <span className={`text-[9px] ${isDayUp ? "text-emerald-400" : "text-red-400"}`}>
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
      </div>

      <div className="border border-slate-200 rounded-xl p-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Portfolio Distribution</h3>
        <HoldingsCharts holdings={data} />
      </div>
    </div>
  );
};

export default Holdingspage;
