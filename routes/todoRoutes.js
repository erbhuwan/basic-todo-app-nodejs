import express from "express";
import {
  createTodo,
  getUsersAllTodos,
} from "../controllers/todoControllers.js";
import { JWTMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// route to create a todo
router
  .route("/")
  .post(JWTMiddleware, createTodo)
  .get(JWTMiddleware, getUsersAllTodos);

export default router;
