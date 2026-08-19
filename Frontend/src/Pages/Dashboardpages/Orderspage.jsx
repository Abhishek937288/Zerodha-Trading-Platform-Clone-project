import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/Mutation/stockMutationFn.js";
import { Skeleton } from "@radix-ui/themes";
import EmptyState from "@/Components/Dashboardcompo/Common/EmptyState";

const fmt = (num) => {
  if (num === null || num === undefined) return "₹0.00";
  return Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatTime = (dateStr) => {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};

const formatFullTime = (dateStr) => {
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const Orderspages = () => {
  const [filter, setFilter] = useState("ALL");
  const { data, isPending, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    staleTime: 0,
  });

  if (isPending) {
    return (
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton width="120px" height="28px" />
          <Skeleton width="80px" height="28px" />
          <Skeleton width="80px" height="28px" />
        </div>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-50/50">
            <Skeleton width="100%" height="16px" />
          </div>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-4 px-4 py-3 border-t border-slate-100">
              <Skeleton width="60px" height="14px" />
              <Skeleton width="100px" height="18px" />
              <Skeleton width="50px" height="14px" />
              <Skeleton width="70px" height="14px" />
              <Skeleton width="80px" height="14px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p className="text-sm">Failed to load orders: {error.message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="Your orders will appear here once you start trading. Head to the dashboard to buy or sell your first stock."
        actionLabel="Go to Dashboard"
        actionLink="/Dashboard/Dashboardpage"
      />
    );
  }

  const buyOrders = data.filter((o) => o.mode === "BUY");
  const sellOrders = data.filter((o) => o.mode === "SELL");
  const totalBuyValue = buyOrders.reduce((sum, o) => sum + o.price * o.qty, 0);
  const totalSellValue = sellOrders.reduce(
    (sum, o) => sum + o.price * o.qty,
    0
  );

  const filtered =
    filter === "ALL"
      ? data
      : filter === "BUY"
      ? buyOrders
      : sellOrders;

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-slate-800">Orders</h2>
          <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">
            {data.length}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-0.5">
          {["ALL", "BUY", "SELL"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                filter === f
                  ? f === "BUY"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : f === "SELL"
                    ? "bg-red-500 text-white shadow-sm"
                    : "bg-white text-slate-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="border border-slate-200 rounded-xl p-3">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            Total Orders
          </p>
          <p className="text-lg font-bold text-slate-800 mt-0.5">{data.length}</p>
        </div>
        <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-3">
          <p className="text-[10px] font-medium text-emerald-600 uppercase tracking-wider">
            Buy Orders
          </p>
          <p className="text-lg font-bold text-emerald-700 mt-0.5">
            {buyOrders.length}
          </p>
          <p className="text-[10px] text-emerald-500">₹{fmt(totalBuyValue)}</p>
        </div>
        <div className="border border-red-200 bg-red-50/30 rounded-xl p-3">
          <p className="text-[10px] font-medium text-red-500 uppercase tracking-wider">
            Sell Orders
          </p>
          <p className="text-lg font-bold text-red-600 mt-0.5">
            {sellOrders.length}
          </p>
          <p className="text-[10px] text-red-400">₹{fmt(totalSellValue)}</p>
        </div>
        <div className="border border-slate-200 rounded-xl p-3">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            Net Value
          </p>
          <p
            className={`text-lg font-bold mt-0.5 ${
              totalBuyValue - totalSellValue >= 0
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >
            ₹{fmt(Math.abs(totalBuyValue - totalSellValue))}
          </p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="text-left text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5">
                  Type
                </th>
                <th className="text-left text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5">
                  Instrument
                </th>
                <th className="text-right text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5">
                  Qty
                </th>
                <th className="text-right text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5 hidden sm:table-cell">
                  Avg Price
                </th>
                <th className="text-right text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5">
                  Total
                </th>
                <th className="text-right text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2.5 hidden md:table-cell">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((order, idx) => {
                const isBuy = order.mode === "BUY";
                const total = order.price * order.qty;

                return (
                  <tr
                    key={order._id || idx}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wide ${
                          isBuy
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        <i
                          className={`fa-solid ${
                            isBuy ? "fa-arrow-up" : "fa-arrow-down"
                          } text-[8px]`}
                        ></i>
                        {order.mode}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">
                          {order.name}
                        </span>
                        <span className="text-[10px] text-slate-400 sm:hidden">
                          ₹{fmt(order.price)} × {order.qty}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs sm:text-sm font-medium text-slate-700">
                        {order.qty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell">
                      <span className="text-xs sm:text-sm text-slate-600">
                        ₹{fmt(order.price)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        ₹{fmt(total)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right hidden md:table-cell">
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-slate-500">
                          {formatTime(order.createdAt)}
                        </span>
                        <span
                          className="text-[9px] text-slate-400"
                          title={formatFullTime(order.createdAt)}
                        >
                          {formatFullTime(order.createdAt)}
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
            <p className="text-sm text-slate-400">
              No {filter.toLowerCase()} orders found
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 px-1">
        <span>
          Showing {filtered.length} of {data.length} orders
        </span>
        <span>
          <i className="fa-solid fa-clock mr-1"></i>
          Times shown in your local timezone
        </span>
      </div>
    </div>
  );
};

export default Orderspages;
