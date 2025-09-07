import stocksModel from "../Models/stockModel.js";

export const addStocksData = async (req, res) => {
  const stocksData = req.body; // can be 1 object or an array
  if (!stocksData) {
    return res.json({
      data: null,
      success: false,
      message: "please give data",
    });
  }
  const dataToInsert = Array.isArray(stocksData) ? stocksData : [stocksData]; //checks weather data is array or not if not then data get added in array
  const stocks = await stocksModel.insertMany(dataToInsert);

  return res.json({
    data: stocks,
    success: true,
    message: "stocks data added",
  });
};

export const getStockData = async (req, res) => {
  const data = await stocksModel.find();
  if (data) {
    return res
      .status(400)
      .json({ data: null, success: false, message: "no data found" });
  }
  return res
    .status(200)
    .json({ data: data, success: true, message: "data got successfully" });
};
