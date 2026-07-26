import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { uploadResumeController , getResumeController} from "../controllers/resumeController.js";

const router = express.Router();

// cause resume is based on interviewID //
router.post("/upload", 
    authMiddleware, 
    upload.single("resume"), 
    uploadResumeController
);

router.get("/get", authMiddleware, getResumeController)

export default router;