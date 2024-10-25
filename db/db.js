import { configDotenv } from "dotenv";
import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/avalon";

const connectDB = async () => {
  try {
    console.log(MONGO_URI);
    await mongoose.connect(MONGO_URI, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
export default connectDB;
