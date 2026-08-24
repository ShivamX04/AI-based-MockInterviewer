import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    console.log("Connecting to database...");
    console.log(
        "MongoDB URL:",
        process.env.MONGO_URL?.replace(/:\/\/.*?:.*?@/, "://****:****@")
    );

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log("MongoDB connection failed:");
        console.log(error);
    }
};

export default connectDB;