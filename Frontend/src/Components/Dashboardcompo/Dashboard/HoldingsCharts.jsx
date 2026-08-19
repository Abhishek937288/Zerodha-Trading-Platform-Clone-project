import React from "react";
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

const HoldingsCharts = ({ holdings }) => {
  if (!holdings || holdings.length === 0) return null;

  const labels = holdings.map((s) => s.name);
  const invested = holdings.map((s) => (s.avg ?? 0) * (s.qty ?? 0));
  const current = holdings.map((s) => (s.price ?? 0) * (s.qty ?? 0));

  const data = {
    labels,
    datasets: [
      {
        label: "Invested",
        data: invested,
        backgroundColor: "rgba(148, 163, 184, 0.5)",
        borderColor: "rgba(100, 116, 139, 0.8)",
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: "Current Value",
        data: current,
        backgroundColor: current.map((val, i) =>
          val >= invested[i]
            ? "rgba(16, 185, 129, 0.5)"
            : "rgba(239, 68, 68, 0.5)"
        ),
        borderColor: current.map((val, i) =>
          val >= invested[i]
            ? "rgba(16, 185, 129, 1)"
            : "rgba(239, 68, 68, 1)"
        ),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          padding: 16,
          font: { size: 11 },
        },
      },
      title: { display: false },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        borderColor: "rgba(148, 163, 184, 0.2)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10,
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed.y;
            const idx = ctx.dataIndex;
            const inv = invested[idx];
            const diff = val - inv;
            const pct = inv > 0 ? ((val - inv) / inv) * 100 : 0;
            return [
              ` ${ctx.dataset.label}: ₹${val.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
              ` ${diff >= 0 ? "+" : ""}₹${diff.toLocaleString("en-IN", { minimumFractionDigits: 2 })} (${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%)`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(226, 232, 240, 0.5)" },
        ticks: {
          font: { size: 10 },
          callback: (val) => {
            if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
            if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
            if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
            return `₹${val}`;
          },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 10 },
          maxRotation: 45,
          callback: function (val) {
            const label = this.getLabelForValue(val);
            return label.length > 10 ? label.substring(0, 10) + "…" : label;
          },
        },
      },
    },
  };

  return (
    <div className="relative">
      <Bar data={data} options={options} />
    </div>
  );
};

export default HoldingsCharts;
