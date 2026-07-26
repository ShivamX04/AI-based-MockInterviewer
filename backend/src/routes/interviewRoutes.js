import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  startInterviewController,
  getInterviewById,
  sumbitInterviewController,
  getInterviewHistoryController,
  getDashboardStats,
} from "../controllers/InterviewController.js";

const router = express.Router();

router.post("/start", authMiddleware, startInterviewController);

router.get("/history", authMiddleware, getInterviewHistoryController);

router.get("/dashboard/stats", authMiddleware, getDashboardStats);

router.post("/submit/:id", authMiddleware, sumbitInterviewController);

router.get("/:id", authMiddleware, getInterviewById);

export default router;