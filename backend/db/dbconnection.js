import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("Connected To DB!!!");
  } catch (error) {
    console.log("DB Error", error?.message);
  }
};

export default dbConnection;
