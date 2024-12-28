import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const JWTMiddleware = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({
        message: "Unauthorized 1",
      });
    }
    const accessToken = bearerToken.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthorized 2",
      });
    }

    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET, {
      algorithms: ["HS512"],
      issuer: "TODO APP",
      ignoreExpiration: false,
    });

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized 3",
      });
    }
    const { password, ...userWithoutPassword } = user.toJSON();
    req.user = userWithoutPassword;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized last",
    });
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
