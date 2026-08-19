import React from "react";
import Topbar from "../Dashboard/Topbar";

import WatchListItems from "../Dashboard/WatchListItems";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";

import { io } from "socket.io-client";
import WatchListCharts from "../Dashboard/WatchListCharts";

import Loading from "@/Components/Commoncompo/Common/Loading";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
const socket = io(
  import.meta.env.MODE === "production"
    ? window.location.origin
    : import.meta.env.VITE_BACKEND_URL
);

const DEBOUNCE_MS = 300;

const Watchlist = () => {
  const [isLoading, setisLoading] = useState(true);
  const [stocksData, setStocksData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [chartOpen, setChartOpen] = useState(false);
  const debounceTimer = useRef(null);

  const handleSearch = useCallback((value) => {
    setSearchInput(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, DEBOUNCE_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const filteredStocks = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return stocksData;
    return stocksData.filter((stock) => {
      const name = stock.name.toLowerCase();
      return name.includes(q);
    });
  }, [stocksData, debouncedQuery]);

  const closeAllForm = () => {
    setStocksData((prevData) =>
      prevData.map((stock) => ({ ...stock, isOpen: false }))
    );
  };

  const toggleForm = (id, state = true) => {
    if (id == undefined) return;
    closeAllForm();
    setStocksData((stocks) => {
      return stocks.map((stock, i) => {
        if (i == id) {
          return { ...stock, isOpen: state };
        }
        return stock;
      });
    });
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected with ID:", socket.id);
    });

    socket.on("stocksData", (data) => {
      setStocksData(data.map((s) => ({ ...s, isOpen: false })));
      setisLoading(false);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("stocksData");
      socket.off("disconnect");
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <Topbar />
      <div className="px-3 py-2 border-b border-slate-200 flex-shrink-0">
        <div className="relative flex items-center">
          <MagnifyingGlassIcon className="absolute left-2.5 text-slate-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full h-9 pl-8 pr-12 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 transition-all"
          />
          <span className="absolute right-2.5 text-[10px] sm:text-xs text-slate-400 font-medium">
            {filteredStocks.length}/{stocksData.length}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
        <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Instrument
        </span>
        <div className="flex items-center gap-4 sm:gap-8">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Change
          </span>
          <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
            LTP
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {filteredStocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <MagnifyingGlassIcon className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No stocks found</p>
            <p className="text-xs mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredStocks.map((stock, index) => {
              const originalIndex = stocksData.findIndex(
                (s) => s.name === stock.name
              );
              return (
                <WatchListItems
                  stock={stock}
                  toggleForm={toggleForm}
                  key={stock.name + "-" + originalIndex}
                  id={originalIndex}
                />
              );
            })}
          </div>
        )}

        {filteredStocks.length > 0 && (
          <div className="border-t border-slate-200">
            <button
              onClick={() => setChartOpen(!chartOpen)}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <span className="font-medium">Portfolio Distribution</span>
              <i
                className={`fa-solid fa-chevron-up text-[10px] transition-transform duration-200 ${
                  chartOpen ? "rotate-180" : ""
                }`}
              ></i>
            </button>
            {chartOpen && (
              <div className="px-4 pb-4">
                <WatchListCharts watchlist={filteredStocks} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
