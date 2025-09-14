import React from "react";
import { Outlet } from "react-router-dom";
import Watchlist from "../Components/Dashboardcompo/Common/Watchlist";

const Dashboardpagelayout = () => {
  return (
    <div className="sm:grid sm:grid-cols-7">
      <div className="hidden sm:block sm:sticky h-screen sm:left-0 sm:col-span-2 overflow-auto scrollbar-hide">
        <Watchlist />
      </div>
      <div className="col-span-5 h-screen overflow-auto scrollbar-hide">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboardpagelayout;
