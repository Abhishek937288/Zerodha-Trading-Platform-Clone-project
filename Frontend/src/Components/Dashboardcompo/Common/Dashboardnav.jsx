import { assets } from "@/assets/assets";
import { NavLink } from "react-router-dom";
import React from "react";
import { Popover } from "@radix-ui/themes";
import { useMediaQuery } from "react-responsive";

const navLinks = [
  { name: "Dashboard", link: "/Dashboard/Dashboardpage" },
  { name: "Orders", link: "/Dashboard/Orderspage" },
  { name: "Holdings", link: "/Dashboard/Holdingspage" },
  { name: "Position", link: "/Dashboard/Positionspage" },
  { name: "Funds", link: "/Dashboard/Fundspage" },
  { name: "Apps", link: "/Dashboard/Appspage" },
];

const Dashboardnav = () => {
  return (
    <div
      className="w-full 
     bg-white  z-10 border-b border-b-slate-400 border-l sm:border-l-slate-400 h-20 sticky top-0 px-3 sm:px-5"
    >
      <div className="flex   h-full items-center justify-between ">
        <div className=" w-8 sm:w-8  ">
          <NavLink to={"/Dashboard/Dashboardpage"}>
            <img src={assets.kitelogo} alt="" />
          </NavLink>
        </div>
        <div className="flex  items-center md:gap-5">
          <div className=" hidden sm:flex sm:gap-1 md:gap-5">
            {navLinks.map((link, idx) => {
              return (
                <p
                  key={idx}
                  className="text-sm border border-transparent  hover:border-b-orange-60 "
                >
                  <NavLink
                    to={link.link}
                    className={({ isActive }) =>
                      isActive
                        ? "border-b-1 border-orange-700"
                        : "border-b-1 border-transparent hover:border-orange-600"
                    }
                  >
                    {link.name}
                  </NavLink>
                </p>
              );
            })}
          </div>

          <div className="flex items-center sm:gap-1 md:gap-5">
            <div className=" sm:hidden">
              <Popover.Root>
                <Popover.Trigger asChild>
                  <button className="px-2 py-2 bg-white rounded border-none">
                    <i className="fa-solid fa-bars"></i>
                  </button>
                </Popover.Trigger>

                <Popover.Content
                  side="bottom"
                  align="center"
                  avoidCollisions={false}
                  className="sm:hidden bg-white mr-5 shadow-md rounded h-60 w-40 "
                >
                  <div className=" flex  flex-col gap-2">
                    <p className="text-sm border border-transparent  hover:border-b-orange-60  text-center ">
                      <NavLink
                        to="/Dashboard/Watchlist"
                        className={({ isActive }) =>
                          isActive
                            ? "border-b-1 border-orange-700"
                            : "border-b-1 border-transparent hover:border-orange-600"
                        }
                      >
                        {" "}
                        Watchlist
                      </NavLink>
                    </p>
                    {navLinks.map((link, idx) => {
                      return (
                        <p
                          key={idx}
                          className="text-sm border border-transparent  hover:border-b-orange-60  text-center "
                        >
                          <NavLink
                            to={link.link}
                            className={({ isActive }) =>
                              isActive
                                ? "border-b-1 border-orange-700"
                                : "border-b-1 border-transparent hover:border-orange-600"
                            }
                          >
                            {link.name}
                          </NavLink>
                        </p>
                      );
                    })}
                  </div>
                </Popover.Content>
              </Popover.Root>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-300 rounded-full flex items-center justify-center">
              <p className="max-sm:text-sm">ZU</p>
            </div>
            <div className="">
              <Popover.Root>
                <Popover.Trigger asChild>
                  <button className="  bg-white rounded border-none">
                    <i className="fa-solid fa-angle-down opacity-80"></i>
                  </button>
                </Popover.Trigger>

                <Popover.Content
                  side="bottom"
                  align="center"
                  avoidCollisions={false}
                  className="bg-white mr-20 shadow-md rounded h-40 w-30 "
                >
                  <p className="text-center"></p>
                </Popover.Content>
              </Popover.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardnav;
