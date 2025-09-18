import React from "react";
import { Outlet } from "react-router-dom";
import Watchlist from "../Components/Dashboardcompo/Common/Watchlist";
import { useNavigate } from "react-router-dom";

import { userAuthstore } from "@/Store/authStore.js";
import { Navigate } from "react-router-dom";

const Dashboardpagelayout = () => {
  const { user } = userAuthstore();

  if (!user) {
    return <Navigate to="/Signuppage" />;
  }
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
