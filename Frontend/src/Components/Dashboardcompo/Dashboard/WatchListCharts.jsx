import React from "react";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const WatchListCharts = ({ watchlist }) => {
  const labels = watchlist.map((stock) => stock.name);
  const dataValues = watchlist.map((stock) => stock.price);

  const backgroundColor = watchlist.map(
    () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock Prices",
        data: dataValues,
        backgroundColor: backgroundColor,
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default WatchListCharts;
