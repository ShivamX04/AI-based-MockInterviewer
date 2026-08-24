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

import dns from "dns";
import net from "net";

dns.resolveSrv("_mongodb._tcp.cluster0.09nhtcc.mongodb.net", (err, addresses) => {
    if (err) {
        console.log("SRV DNS ERROR:", err);
        return;
    }

    console.log("ATLAS SRV:", addresses);

    const host = addresses[0].name;

    const socket = net.createConnection(
        { host, port: 27017, timeout: 10000 },
        () => {
            console.log("TCP 27017 CONNECTION: SUCCESS");
            socket.destroy();
        }
    );

    socket.on("error", (error) => {
        console.log("TCP 27017 CONNECTION: FAILED");
        console.log(error.message);
    });

    socket.on("timeout", () => {
        console.log("TCP 27017 CONNECTION: TIMEOUT");
        socket.destroy();
    });
});

export default connectDB;