import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRoutes from "./routes/userRoutes.js";
import TodoRoutes from "./routes/todoRoutes.js";

const app = express();

dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Server is running.",
  });
});

// user routes
app.use("/users", UserRoutes);

// todo routes
app.use("/todos", TodoRoutes);

// IIFE
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected");
})();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
