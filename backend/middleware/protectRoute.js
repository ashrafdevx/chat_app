import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ status: 401, error: "No token provided" });
    }
    const { userId } = jwt.verify(token, process.env.SECRETE_KEY);

    if (!userId) {
      res.status(401).json({ status: 401, error: "Invalid token" });
    }

    const authorizedUser = await User.findById(userId).select("-password");
    if (!authorizedUser) {
      res.status(401).json({ status: 401, error: "User not found!" });
    }
    req.user = authorizedUser;
    next();
  } catch (error) {
    console.log("Protected Route :", error.message);
    res.status(500).json({ status: 500, error: error.message });
  }
};
