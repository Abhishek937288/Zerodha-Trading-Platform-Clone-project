import mongoose from "mongoose";
import { Schema } from "mongoose";

const fundSchema = new Schema({
  totalAmount: {
    type : Number,
    default :0
  },
  investedAmount: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const fundModel = mongoose.model("Fund", fundSchema);
export default fundModel;
