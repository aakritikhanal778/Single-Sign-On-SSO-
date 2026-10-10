import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
    console.log("Database Name:", conn.connection.name);
    console.log("Host:", conn.connection.host);
    console.log("ReadyState:", mongoose.connection.readyState);
  } catch (err) {
    console.log("MongoDB Connection Error:", err.message);
    throw err;
  }
};