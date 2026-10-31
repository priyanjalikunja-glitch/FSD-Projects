import mongoose from "mongoose";

const connectDB = async(mongouri,dbname) => {
  try {
    await mongoose.connect(mongouri, { dbName: dbname });
  } catch (env) {
    console.log("Error while connecting mongodb");
  }
};

export default connectDB;