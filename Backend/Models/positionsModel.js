import mongoose from "mongoose";
import { Schema } from "mongoose";

const positionSchema = new Schema(
  {
    product: String,
    name: String,
    qty: Number,
    avg: {type:Number,default:100},
    price: Number,
    net: String,
    isLoss: Boolean,
    day: String,
    prevClose: { type: Number, default: 100 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,

    },
  },
  {
    timestamps: true,
  }
);

const positionModel = mongoose.model("Position", positionSchema);
export default positionModel;
