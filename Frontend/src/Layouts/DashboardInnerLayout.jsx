import Dashboardnav from "@/Components/Dashboardcompo/Common/Dashboardnav";
import React from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const DashboardInnerLayout = () => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 640px)" });
  const location = useLocation();
  

  // If on Watchlist and screen is large, redirect to index
  if (isLargeScreen && location.pathname === "/Dashboard/Watchlist") {
    return <Navigate to="/Dashboard/Dashboardpage" replace />;
  }
  return (
    <div className="  w-full flex flex-col ">
      <Dashboardnav />
      <Outlet />
    </div>
  );
}

export default DashboardInnerLayout;
