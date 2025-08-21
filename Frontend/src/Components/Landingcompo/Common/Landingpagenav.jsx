import React, { useState } from "react";
import { assets } from "../../../assets/assets";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Landingpagenav = () => {
  const [isOpen, setIsopen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-10">
      <nav className=" container h-16  flex items-center  justify-between px-5">
        <div className="">
          <Link to="/">
            <img src={assets.logo} alt="" className="max-w-40" />
          </Link>
        </div>
        <div className="flex items-center gap-10">
          <div className=" hidden md:flex  items-center justify-between gap-10 ">
            <Link to="Signuppage" className="hover:text-blue-700">
              Signup
            </Link>
            <Link to="/Aboutpage" className="hover:text-blue-700">
              About
            </Link>
            <Link to="/Productpage" className="hover:text-blue-700">
              Product
            </Link>
            <Link to="Pricingpage" className="hover:text-blue-700">
              Pricing
            </Link>
            <Link to="/Supportpage" className="hover:text-blue-700">
              Support
            </Link>
          </div>
          <div className="relative w-full">
            <i
              className="fa-solid fa-bars fa-lg cursor-pointer "
              onClick={() => {
                setIsopen(!isOpen);
              }}
            ></i>
          </div>
          {isOpen && (
            <div className=" absolute w-[90vw] top-12 right-4 sm:right-13  h-[90vh] bg-white border border-slate-200 md:w-[55vw] md:h-[70vh] rounded-lg">
              <div className="flex flex-row-reverse pr-3 sm:hidden">
                <button
                className = "text-lg font-semibold opacity-80 cursor-pointer"
                  onClick={() => {
                    
                    setIsopen(false);
                  }}
                  
                >
                  <i className="fa-solid fa-xmark fa-xl"></i>
                </button>
              </div>

              <div className="md:hidden h-33  grid grid-cols-2  items-center  ">
                <div className="flex items-center justify-center">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Link to="Signuppage" className="hover:text-blue-700">
                        Signup
                      </Link>
                    </li>
                    <li>
                      <Link to="/Aboutpage" className="hover:text-blue-700">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link to="/Productpage" className="hover:text-blue-700">
                        Product
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Link to="Pricingpage" className="hover:text-blue-700">
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link to="/Supportpage" className="hover:text-blue-700">
                        Support
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-33 md:h-[50%]  grid md:grid-cols-4 grid-cols-2 ">
                <div className="flex flex-row lg:flex-col items-center justify-center gap-2 cursor-pointer text-center" onClick={()=>{
                  setIsopen(false);
                  navigate("/Dashboardpage");
                }}>
                  <img src={assets.kitelogo} className="w-10" alt="" />
                  <p className="opacity-80  ">kite</p>
                  <span className="hidden lg:block  text-sm text-center opacity-70">
                    Trading platform{" "}
                  </span>
                </div>
                <div className="flex flex-row lg:flex-col items-center justify-center gap-2 cursor-pointer ">
                  <img src={assets.consoles} className="w-10" alt="" />
                  <p className="opacity-80">Console</p>
                  <span className="hidden lg:block  text-sm text-center opacity-70">
                    Backoffice{" "}
                  </span>
                </div>
                <div className="flex flex-row lg:flex-col items-center justify-center gap-1 cursor-pointer ">
                  <img src={assets.kiteconnectSvg} className="w-10" alt="" />
                  <p className="opacity-80 text-center">kiteconnect</p>
                  <span className="hidden lg:block  text-sm text-center opacity-70">
                    Trading APIs{" "}
                  </span>
                </div>
                <div className="flex flex-row lg:flex-col items-center justify-center gap-2 cursor-pointer">
                  <img src={assets.coins} className="w-10" alt="" />
                  <p className="opacity-80">Coin</p>
                  <span className="hidden lg:block  text-sm text-center opacity-70">
                    Mutual Funds{" "}
                  </span>
                </div>
              </div>
              <div className="h-[40%] sm:h-[50%]  bg-slate-50 grid grid-cols-4  px-5">
                <div className=" col-span-2 lg:col-span-1 flex flex-col items-center pt-5 ">
                  <p className="text-lg font-semibold opacity-80">Utilities</p>
                  <ul className="flex pt-3 flex-col gap-2 items-center justify-center" >
                    <li className="text-center">
                      <a href="" className="hover:text-blue-700 text-center text-md opacity-80">
                        Calculators
                      </a>
                    </li>
                    <li className="text-center"><a href="" className="hover:text-blue-700  text-md opacity-80" >Brokerage calculator</a></li>
                    <li className="text-center"> <a href="" className="hover:text-blue-700 text-center text-md opacity-80" >Margin calculator </a></li>
                    <li className="text-center"> <a href=""  className="hover:text-blue-700 text-center text-md opacity-80">SIP calculator </a></li>
                  </ul>
                </div>
                <div className=" col-span-2 lg:col-span-1 flex flex-col items-center pt-5  ">
                  <p className="text-lg font-semibold opacity-80">Updates</p>
                  <ul className="flex pt-3 flex-col gap-2 items-center justify-center ">
                    <li className="text-center"> <a href="" className="hover:text-blue-700 text-center text-md opacity-80">Z-Connect blog </a></li>
                    <li className="text-center"> <a href="" className="hover:text-blue-700 text-center text-md opacity-80">Ciculars/Bulletin </a></li>
                    <li className="text-center"><a href=""  className="hover:text-blue-700 text-center text-md opacity-80" >IPOs</a></li>
                    <li className="text-center"><a href="" className="hover:text-blue-700 text-center text-md opacity-80" >Markets</a></li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Landingpagenav;
