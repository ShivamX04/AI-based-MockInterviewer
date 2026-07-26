import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () =>{
    console.log("Connecting to database...");
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database successfully");
    }catch(error){
        console.log("error connecting to database", error.message);
    }
}

export default connectDB;