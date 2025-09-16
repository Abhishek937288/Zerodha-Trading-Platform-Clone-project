import positionModel from "../Models/positionsModel.js";

export const positions = async (req, res) => {
  const positions = await positionModel.find({ userId: req.userId });
  if (!positions) {
    return res
      .status(400)
      .json({ data: null, success: false, message: "no positions found" });
  } else {
    return res
      .status(200)
      .json({
        data: positions,
        success: true,
        message: "positions found succesfully",
      });
  }
};
