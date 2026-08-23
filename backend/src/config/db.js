import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    console.log("Connecting to database...");

    console.log("MONGO_URL exists:", !!process.env.MONGO_URL);
    console.log(
        "MongoDB host:",
        process.env.MONGO_URL?.split("@")[1]?.split("/")[0]
    );

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("Connected to database successfully");
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);
    }
};