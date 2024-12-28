import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userControllers.js";
import { getUserProfile, JWTMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// registration route
router.post("/register", registerUser);

// login route
router.post("/login", loginUser);

// profile route (protected route)
router.get("/profile", JWTMiddleware, getUserProfile);

export default router;
