import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // console.log("Mongo URI:", process.env.MONGODB_URI);
    // console.log("Ready State Before:", mongoose.connection.readyState);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log(" MongoDB Connected Successfully");
    // console.log("Ready State After:", mongoose.connection.readyState);
  } catch (error) {
    console.error(" MongoDB Connection Failed");
    console.error(error);
  }
}
export default connectDB;



