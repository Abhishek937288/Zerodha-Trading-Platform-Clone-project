import React from "react";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#6366F1",
];

const WatchListCharts = ({ watchlist }) => {
  if (!watchlist || watchlist.length === 0) return null;

  const labels = watchlist.map((stock) => stock.name);
  const dataValues = watchlist.map((stock) => stock.price);
  const totalValue = dataValues.reduce((sum, val) => sum + val, 0);

  const backgroundColor = watchlist.map(
    (_, i) => CHART_COLORS[i % CHART_COLORS.length]
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock Price",
        data: dataValues,
        backgroundColor: backgroundColor,
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverBorderColor: "#ffffff",
        hoverBorderWidth: 3,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "55%",
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 800,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        borderColor: "rgba(148, 163, 184, 0.2)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10,
        titleFont: { size: 12, weight: "600" },
        bodyFont: { size: 11 },
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            const percentage = ((value / totalValue) * 100).toFixed(1);
            return ` ₹${value.toLocaleString("en-IN")} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full max-w-[200px]">
        <Doughnut data={data} options={options} />
      </div>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 px-2">
        {watchlist.map((stock, i) => (
          <div key={stock.name} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
              }}
            ></span>
            <span className="text-[10px] sm:text-xs text-slate-600">
              {stock.name}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400">
              {((stock.price / totalValue) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchListCharts;
