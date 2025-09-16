import fundModel from "../Models/fundsModel.js";

export const addFund = async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount < 0) {
    return res.status(400).json({
      data: null,
      success: false,
      message: "please enter valid amount",
    });
  }
  const fund = await fundModel.findOne({ userId: req.userId });
  if (!fund) {
    const fund = new fundModel({
      userId: req.userId,
      totalAmount: amount,
      investedAmount: 0,
    });
    await fund.save();
    return res.status(200).json({
      data: fund,
      success: true,
      message: "Fund created and amount added successfully",
    });
  }
  const totalAmount = fund.totalAmount + amount;
  fund.totalAmount = totalAmount;
  await fund.save();
  return res
    .status(200)
    .json({ data: fund, success: true, message: "amount added successfully" });
};

export const getFundAmount = async (req, res) => {
  const fund = await fundModel.find({ userId: req.userId });
  if (!fund) {
    return res
      .status(404)
      .json({ data: null, success: false, message: "fund not found" });
  }
  return res
    .status(200)
    .json({ data: fund, success: true, message: "fund found successfully" });
};
