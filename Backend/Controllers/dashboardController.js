import fundModel from "../Models/fundsModel.js";
import holdingModel from "../Models/holdingsModel.js";

export const getDashboard = async (req, res) => {
  try {
    const fund = await fundModel.findOne({ userId: req.userId });
    if (!fund) {
      return res.status(200).json({
        success: true,
        message: "No holdings yet",
        data: {
          investment: 0,
          marginAvailable: 0,
          marginUsed: 0,
          currentValue: 0,
          pnl: 0,
          pnlPercent: "0.00",
          holdingsCount: 0,
          topGainer: null,
          topLoser: null,
        },
      });
    }

    const holdings = await holdingModel.find({ userId: req.userId });

    const investment = fund.investedAmount;
    const marginAvailable = fund.totalAmount;
    const currentValue = holdings.reduce((acc, h) => acc + h.price * h.qty, 0);
    const marginUsed = investment;
    const pnl = currentValue - investment;
    const pnlPercent =
      investment > 0 ? ((pnl / investment) * 100).toFixed(2) : "0.00";

    let topGainer = null;
    let topLoser = null;
    let maxGain = -Infinity;
    let maxLoss = Infinity;

    holdings.forEach((h) => {
      const profit = (h.price - h.avg) * h.qty;
      if (profit > maxGain) {
        maxGain = profit;
        topGainer = { name: h.name, profit: profit.toFixed(2) };
      }
      if (profit < maxLoss) {
        maxLoss = profit;
        topLoser = { name: h.name, loss: profit.toFixed(2) };
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        investment,
        marginAvailable,
        marginUsed,
        currentValue,
        pnl: parseFloat(pnl.toFixed(2)),
        pnlPercent,
        holdingsCount: holdings.length,
        topGainer,
        topLoser,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};
