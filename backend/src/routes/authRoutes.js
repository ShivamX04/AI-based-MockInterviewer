import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { loginUserController, registerUserController, getCurrentUser, logoutUserController } from '../controllers/authController.js';

const router = express.Router();

router.post("/register", registerUserController)
router.post("/login", loginUserController);
router.get("/me", authMiddleware, getCurrentUser);
router.post("/logout", logoutUserController);

export default router;