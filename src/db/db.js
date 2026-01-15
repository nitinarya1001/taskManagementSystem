import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log("MONGODB connected! ", connectionInstance.connection.host);
  } catch (error) {
    console.log("MONGODB Connection Failed !!!!", error);
  }
};

export default connectDB;
