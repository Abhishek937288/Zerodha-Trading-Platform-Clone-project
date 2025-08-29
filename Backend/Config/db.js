import mongoose from "mongoose";
import env from "envgaurd";

const MONGO_URL = env("MONGO_URL");

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Mongo Db connected");
  } catch (err) {
    console.log(`Failed to connnect error : ${err}`);
  }
};

export default connectDb; 
