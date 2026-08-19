import React from "react";
import { Outlet } from "react-router-dom";
import Watchlist from "../Components/Dashboardcompo/Common/Watchlist";
import { useWatchlistStore } from "@/Store/watchlistStore";

import { userAuthstore } from "@/Store/authStore.js";
import { Navigate } from "react-router-dom";

const Dashboardpagelayout = () => {
  const { user } = userAuthstore();
  const [watchlistOpen, setWatchlistOpen] = React.useState(false);
  const { stocksData, isLoading } = useWatchlistStore();

  if (!user) {
    return <Navigate to="/Signuppage" />;
  }

  return (
    <div className="sm:grid sm:grid-cols-7">
      {/* Desktop sidebar */}
      <div className="hidden sm:block sm:sticky h-screen sm:left-0 sm:col-span-2 overflow-hidden">
        <Watchlist />
      </div>

      {/* Mobile bottom sheet watchlist */}
      {watchlistOpen && (
        <div className="sm:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setWatchlistOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl animate-slide-up max-h-[85vh] flex flex-col">
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-slate-300"></div>
            </div>
            <div className="relative flex-1 overflow-hidden">
              <button
                onClick={() => setWatchlistOpen(false)}
                className="absolute top-2 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-600 shadow-sm"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
              <Watchlist />
            </div>
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="col-span-5 h-screen overflow-auto scrollbar-hide">
        {/* Mobile header with watchlist toggle */}
        <div className="sm:hidden flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-30">
          <button
            onClick={() => setWatchlistOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
          >
            <i className="fa-solid fa-magnifying-plus text-blue-600"></i>
            <span>Watchlist</span>
            {!isLoading && stocksData.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-600 rounded-full">
                {stocksData.length}
              </span>
            )}
          </button>
          <img
            src="https://cdn.zerodha.com/static/images/kite-logo.svg"
            alt="Kite"
            className="h-5"
            onError={(e) => {
              e.target.src = "https://kite.zerodha.com/static/images/kite-logo.svg";
            }}
          />
        </div>

        <Outlet />
      </div>

      {/* Mobile floating action button */}
      <button
        onClick={() => setWatchlistOpen(true)}
        className="sm:hidden fixed bottom-6 right-5 z-40 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center active:scale-95 transition-all duration-150"
      >
        <i className="fa-solid fa-list-ul text-lg"></i>
        {!isLoading && stocksData.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
            {stocksData.length}
          </span>
        )}
      </button>
    </div>
  );
};

export default Dashboardpagelayout;
