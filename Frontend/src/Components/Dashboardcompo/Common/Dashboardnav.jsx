import { assets } from "@/assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { logOutFn } from "@/Mutation/authMutationFn.js";
import { useMutation } from "@tanstack/react-query";
import { userAuthstore } from "@/Store/authStore.js";
import toast from "react-hot-toast";

const navLinks = [
  { name: "Dashboard", link: "/Dashboard/Dashboardpage", icon: "fa-solid fa-grid-2" },
  { name: "Orders", link: "/Dashboard/Orderspage", icon: "fa-solid fa-receipt" },
  { name: "Holdings", link: "/Dashboard/Holdingspage", icon: "fa-solid fa-layer-group" },
  { name: "Positions", link: "/Dashboard/Positionspage", icon: "fa-solid fa-chart-line" },
  { name: "Funds", link: "/Dashboard/Fundspage", icon: "fa-solid fa-wallet" },
];

const Dashboardnav = () => {
  const navigate = useNavigate();
  const { setUser, user } = userAuthstore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userName = user?.username || "User";
  const userInitials = userName.slice(0, 2).toUpperCase();

  const { mutate } = useMutation({
    mutationFn: logOutFn,
    onSuccess: () => {
      userAuthstore.getState().removeToken();
      setUser(null);
      navigate("/");
      toast.success("Logged out successfully");
    },
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white z-20 border-b border-slate-200 h-14 sm:h-16 sticky top-0">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <NavLink
            to="/Dashboard/Dashboardpage"
            className="flex items-center gap-2 flex-shrink-0"
          >
            <img src={assets.kitelogo} alt="Kite" className="h-6 sm:h-7" />
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.link}
                to={link.link}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                    isActive
                      ? "text-orange-600 bg-orange-50"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/Dashboard/Watchlist")}
            className="md:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <i className="fa-solid fa-magnifying-plus text-sm"></i>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"} text-sm`}></i>
          </button>

          <div className="hidden md:block w-px h-6 bg-slate-200"></div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 p-1 pr-2 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-white">
                  {userInitials}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-700 max-w-[100px] truncate">
                {userName}
              </span>
              <i
                className={`fa-solid fa-chevron-up text-[8px] text-slate-400 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              ></i>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {userName}
                  </p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                <div className="py-1.5">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/Dashboard/Fundspage");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <i className="fa-solid fa-wallet text-slate-400 w-4 text-center"></i>
                    Funds
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/Dashboard/Orderspage");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <i className="fa-solid fa-clock-rotate-left text-slate-400 w-4 text-center"></i>
                    Order History
                  </button>
                </div>
                <div className="border-t border-slate-100 py-1.5">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      mutate();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <i className="fa-solid fa-right-from-bracket w-4 text-center"></i>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.link}
                to={link.link}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "text-orange-600 bg-orange-50"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                <i className={`${link.icon} w-4 text-center text-xs`}></i>
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Dashboardnav;
