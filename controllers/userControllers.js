import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const dbUser = await User.findOne({
      email,
    });

    if (!dbUser) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const passwordFlag = await bcrypt.compare(password, dbUser.password);

    if (!passwordFlag) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(
      { userId: dbUser._id },
      process.env.JWT_SECRET,
      {
        algorithm: "HS512",
        issuer: "TODO APP",
        expiresIn: "15m",
      }
    );

    return res.status(200).json({
      message: "Login Successfull",
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
