import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes.js";
import interviewRoutes from "./src/routes/interviewRoutes.js"
import { startInterviewController , getInterviewById, sumbitInterviewController, getInterviewHistoryController} from "./src/controllers/InterviewController.js";
import resumeRoutes from "./src/routes/resume.routes.js";
import path from "path"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/interview/:id", getInterviewById);
app.use("/api/interview/submit/:id", sumbitInterviewController)
app.use("/api/interview/history", getInterviewHistoryController);
app.use("/api/resume", resumeRoutes);

export default app;