import React from "react";
import { Outlet } from "react-router-dom";
import Dashboardnav from "../Components/Dashboardcompo/Common/Dashboardnav";
import Sidebar from "../Components/Dashboardcompo/Common/Sidebar";
const Dashboardpagelayout = () => {
  return (
    <>
      <Dashboardnav />
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Dashboardpagelayout;
