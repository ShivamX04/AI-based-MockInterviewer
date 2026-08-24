import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    console.log("Connecting to database...");

    const mongoUrl = process.env.MONGO_URL;

    console.log(
        "MongoDB configured:",
        mongoUrl ? "YES" : "NO"
    );

    console.log(
        "MongoDB host:",
        mongoUrl?.split("@")[1]?.split("/")[0]
    );

    try {
        await mongoose.connect(mongoUrl, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("Connected to database successfully");
    } catch (error) {
        console.log("MongoDB connection failed:");
        console.log(error.message);
    }
};

export default connectDB;