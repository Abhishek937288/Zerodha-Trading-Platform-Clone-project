import React from 'react'
import {Outlet} from "react-router-dom";
import Langingpagenav from "../Components/Landingcompo/Common/Landingpagenav";
import Footer from "../Components/Landingcompo/Common/Footer";

const Landingpagelayout = () => {
  return (
    <>
    <Langingpagenav/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Landingpagelayout