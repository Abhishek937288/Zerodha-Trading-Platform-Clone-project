import React from "react";
import { watchlist } from "@/data/data";
import Topbar from "../Dashboard/Topbar";

import WatchListItems from "../Dashboard/WatchListItems";

import { useState, useEffect } from "react";

import { io } from "socket.io-client";
import WatchListCharts from "../Dashboard/WatchListCharts";

import Loading from "@/Components/Commoncompo/Common/Loading";
const socket = io(
  import.meta.env.MODE === "production"
    ? window.location.origin // same server
    : import.meta.env.VITE_BACKEND_URL
);

const Watchlist = () => {
  const [isLoading, setisLoading] = useState(true);
  const [stocksData, setStocksData] = useState([]);

  const closeAllForm = () => {
    setStocksData((prevData) =>
      prevData.map((stock) => ({ ...stock, isOpen: false }))
    );
  };

  // take id and id and map check if index matches id then toggle isOpen

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
      setStocksData(data.map((s) => ({ ...s, isOpen: false }))); // isBuyOpen , isSellOpen
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
    <div className="container h-[100vh]  sticky left-0  ">
      <Topbar />
      <div className="border-r   border-r-slate-300 h-full   overflow-auto scrollbar-hide">
        <div className="w-full flex  px-3 gap-2 border-b  border-b-slate-300 items-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search eg:infy bse nifty  fut weekly, gold mcx "
            className=" text-center text-xs sm:text-sm h-10 w-full opacity-80"
          />
          <span className="text-center text-xs sm:text-sm opacity-80">
            {stocksData.length}/50
          </span>
        </div>
        <ul>
          <div className="flex flex-col mt-3 gap-3">
            {stocksData.map((stock, index) => {
              return (
                <WatchListItems
                  stock={stock}
                  toggleForm={toggleForm}
                  key={index}
                  id={index}
                />
              );
            })}
          </div>
        </ul>
        <WatchListCharts watchlist={stocksData} />
      </div>
    </div>
  );
};

export default Watchlist;
