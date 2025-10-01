import fundModel from "../Models/fundsModel.js";
import holdingModel from "../Models/holdingsModel.js";

export const getDashboard = async (req, res) => {
  try {
   
    const fund = await fundModel.findOne({ userId: req.userId });
    if (!fund) {
      return res.status(400).json({
        success: false,
        message: "Fund not found",
        data: null,
      });
    }

   
    const holdings = await holdingModel.find({ userId: req.userId });

    
    const investment = fund.investedAmount;
    const marginAvailable = fund.totalAmount;
    const currentValue = holdings.reduce(
      (acc, h) => acc + h.price * h.qty,
      0
    );
    const pnl = currentValue - investment;
    const pnlPercent = investment > 0 ? ((pnl / investment) * 100).toFixed(2) : "0";

    
    return res.status(200).json({
      success: true,
      data: {
        investment,
        marginAvailable,
        currentValue,
        pnl,
        pnlPercent: pnlPercent + "%",
        holdings,
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
