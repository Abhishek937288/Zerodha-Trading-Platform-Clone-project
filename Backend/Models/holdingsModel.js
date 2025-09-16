import mongoose from "mongoose";
import { Schema } from "mongoose";

const holdingSchema = new Schema(
  {
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    prevClose: { type: Number, default: 100 },
    isLoss: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const holdingModel = mongoose.model("Holding", holdingSchema);
export default holdingModel;
