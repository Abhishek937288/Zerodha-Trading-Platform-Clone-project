import React from "react";
import { assets } from "@/assets/assets";
import { useNavigate } from "react-router-dom";

const EmptyState = ({ title, description, actionLabel, actionLink, icon }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-4 py-12">
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes pulse-ring {
            0% { transform: scale(0.95); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 0.3; }
            100% { transform: scale(0.95); opacity: 0.7; }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          .animate-pulse-ring {
            animation: pulse-ring 3s ease-in-out infinite;
          }
        `}
      </style>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 flex flex-col items-center text-center relative overflow-hidden">
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />

        {/* Decorative background circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-60" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-orange-50 rounded-full opacity-60" />

        {/* Animated illustration */}
        <div className="relative mb-8 z-10">
          <div className="w-44 h-44 sm:w-52 sm:h-52 relative animate-float">
            <img
              src={icon || assets.EmptyPortfolioImage}
              alt="Empty state"
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>
          {/* Pulsing ring behind icon */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-blue-100/40 animate-pulse-ring" />
          </div>
        </div>

        {/* Text content */}
        <div className="z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            {title}
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-4 rounded-full" />
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-xs mx-auto">
            {description}
          </p>
        </div>

        {/* Action button */}
        {actionLabel && (
          <button
            onClick={() => navigate(actionLink || "/Dashboard/Dashboardpage")}
            className="z-10 px-7 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            <span className="flex items-center gap-2">
              {actionLabel}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
