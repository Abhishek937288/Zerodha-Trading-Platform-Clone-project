import mongoose from "mongoose";

const stocksSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  percent: { type: String, required: true },
  isDown: { type: Boolean, default: false },
});

const stocksModel = mongoose.model("Stocks", stocksSchema);
export default stocksModel;
