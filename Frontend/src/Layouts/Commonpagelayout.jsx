import React from 'react';
import {Outlet} from "react-router-dom";
import Commonpagenav from "../Components/Commoncompo/Common/Commonpagenav";

const Commonpagelayout = () => {
  return (
    <> 
    <Commonpagenav />
    <Outlet/>
   </>
  )
}

export default Commonpagelayout;