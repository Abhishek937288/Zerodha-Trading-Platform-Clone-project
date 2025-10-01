import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const PositionsCharts = ({positions}) => {
  const labels = positions.map((stock) => stock.name); 
    const dataValues = positions.map((stock) => stock.price);
    const backgroundColor = positions.map(
      () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
    );
  
    const data = {
      labels,
      datasets: [
        {
          label: "Price", 
          data: dataValues,
          backgroundColor: backgroundColor,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Holdings Price Chart" },
      },
      scales: {
        y: { beginAtZero: true },
      },
    };
  
    return <Bar data={data} options={options} />;
}

export default PositionsCharts;