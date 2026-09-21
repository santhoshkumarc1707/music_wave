import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error);

    throw error;
  }
};

export default connectDB;