import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const StockProgress = ({ stock }) => {
  const percent = parseFloat(stock.percent); 
  const isDown = stock.isDown;

  return (
    <div style={{ width: 150, height: 150 }}>
      <CircularProgressbar
        value={percent}
        text={`₹${stock.price}`}
        styles={buildStyles({
          pathColor: isDown ? "red" : "green",
          textColor: "#000",
          trailColor: "#eee",
        })}
      />
      <p style={{ textAlign: "center" }}>{stock.name}</p>
    </div>
  );
};

export default StockProgress;
