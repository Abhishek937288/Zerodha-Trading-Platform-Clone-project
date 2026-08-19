import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFunds, getFunds } from "@/Mutation/fundsMutation.js";
import { getHoldings } from "@/Mutation/stockMutationFn.js";
import toast from "react-hot-toast";
import { Skeleton } from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";

const fmt = (num) => {
  if (num === null || num === undefined) return "0.00";
  return Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Fundspage = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");

  const { data: funds, isPending: fundsLoading, error: fundsError } = useQuery({
    queryKey: ["funds"],
    queryFn: getFunds,
  });

  const { data: holdings } = useQuery({
    queryKey: ["stocks"],
    queryFn: getHoldings,
  });

  const mutation = useMutation({
    mutationFn: addFunds,
    onSuccess: (res) => {
      setAmount("");
      setShowModal(false);
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["funds"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add funds");
      setAmount("");
    },
  });

  if (fundsLoading) {
    return (
      <div className="p-4 sm:p-6 space-y-4">
        <Skeleton width="140px" height="28px" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4">
              <Skeleton width="100px" height="14px" />
              <Skeleton width="120px" height="28px" className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (fundsError) {
    return (
      <div className="p-6 text-center text-red-500">
        <p className="text-sm">Failed to load funds: {fundsError.message}</p>
      </div>
    );
  }

  const fund = funds?.[0] || { totalAmount: 0, investedAmount: 0 };
  const totalAmount = fund.totalAmount ?? 0;
  const investedAmount = fund.investedAmount ?? 0;
  const availableBalance = totalAmount - investedAmount;

  const totalHoldingsValue = holdings?.reduce((s, h) => s + (h.price ?? 0) * (h.qty ?? 0), 0) ?? 0;
  const totalHoldingsInvested = holdings?.reduce((s, h) => s + (h.avg ?? 0) * (h.qty ?? 0), 0) ?? 0;
  const holdingsPnl = totalHoldingsValue - totalHoldingsInvested;
  const netWorth = availableBalance + totalHoldingsValue;

  const presets = [1000, 5000, 10000, 25000, 50000, 100000];

  const handleAdd = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    mutation.mutate({ amount: val });
  };

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Funds</h2>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          <i className="fa-solid fa-plus text-[10px]"></i>
          Add Funds
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="fa-solid fa-wallet text-[10px] text-emerald-600"></i>
            </div>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Available Balance</p>
          </div>
          <p className="text-xl font-bold text-emerald-600">₹{fmt(availableBalance)}</p>
          <p className="text-[10px] text-slate-400 mt-1">Ready to trade</p>
        </div>

        <div className="border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <i className="fa-solid fa-arrow-down text-[10px] text-blue-600"></i>
            </div>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total Deposited</p>
          </div>
          <p className="text-xl font-bold text-slate-800">₹{fmt(totalAmount)}</p>
          <p className="text-[10px] text-slate-400 mt-1">Lifetime deposits</p>
        </div>

        <div className="border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
              <i className="fa-solid fa-chart-pie text-[10px] text-violet-600"></i>
            </div>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Used Margin</p>
          </div>
          <p className="text-xl font-bold text-slate-800">₹{fmt(investedAmount)}</p>
          <p className="text-[10px] text-slate-400 mt-1">Blocked in positions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
              <i className="fa-solid fa-chart-line text-[10px] text-amber-600"></i>
            </div>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Holdings Value</p>
          </div>
          <p className="text-xl font-bold text-slate-800">₹{fmt(totalHoldingsValue)}</p>
        </div>

        <div className="border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center">
              <i className="fa-solid fa-coins text-[10px] text-cyan-600"></i>
            </div>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Holdings Invested</p>
          </div>
          <p className="text-xl font-bold text-slate-800">₹{fmt(totalHoldingsInvested)}</p>
        </div>

        <div className={`border rounded-xl p-4 ${holdingsPnl >= 0 ? "border-emerald-200 bg-emerald-50/30" : "border-red-200 bg-red-50/30"}`}>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${holdingsPnl >= 0 ? "bg-emerald-100" : "bg-red-100"}`}>
              <i className={`fa-solid fa-scale-unbalanced text-[10px] ${holdingsPnl >= 0 ? "text-emerald-600" : "text-red-500"}`}></i>
            </div>
            <p className={`text-[10px] font-medium uppercase tracking-wider ${holdingsPnl >= 0 ? "text-emerald-600" : "text-red-500"}`}>Holdings P&L</p>
          </div>
          <p className={`text-xl font-bold ${holdingsPnl >= 0 ? "text-emerald-600" : "text-red-500"}`}>
            {holdingsPnl >= 0 ? "+" : ""}₹{fmt(holdingsPnl)}
          </p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-xl p-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Net Worth Summary</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Available Balance</span>
            <span className="text-sm font-medium text-slate-800">₹{fmt(availableBalance)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Holdings Value</span>
            <span className="text-sm font-medium text-slate-800">₹{fmt(totalHoldingsValue)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Holdings P&L</span>
            <span className={`text-sm font-medium ${holdingsPnl >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {holdingsPnl >= 0 ? "+" : ""}₹{fmt(holdingsPnl)}
            </span>
          </div>
          <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Net Worth</span>
            <span className="text-lg font-bold text-slate-800">₹{fmt(netWorth)}</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={() => { setShowModal(false); setAmount(""); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-800">Add Funds</h3>
                <button
                  onClick={() => { setShowModal(false); setAmount(""); }}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-xs"></i>
                </button>
              </div>

              <div className="mb-4">
                <label className="text-xs font-medium text-slate-500 mb-1 block">Amount (₹)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                    className="w-full pl-7 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {presets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setAmount(String(p))}
                    className="px-2.5 py-1 text-[11px] font-medium border border-slate-200 rounded-md hover:bg-slate-50 text-slate-600 cursor-pointer transition-colors"
                  >
                    ₹{p >= 1000 ? `${p / 1000}K` : p}
                  </button>
                ))}
              </div>

              <button
                onClick={handleAdd}
                disabled={mutation.isPending || !amount}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {mutation.isPending ? "Adding..." : "Add Funds"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Fundspage;
