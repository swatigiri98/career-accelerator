import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";

/**
 * Protects routes by requiring a valid "Bearer <token>" Authorization header.
 * Attaches the authenticated user (minus password hash) to req.user.
 */
export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Not authorized - no token provided");
  }

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized - invalid or expired token");
  }

  const user = await User.findById(decoded.id).select("-passwordHash");
  if (!user) {
    res.status(401);
    throw new Error("Not authorized - user no longer exists");
  }

  req.user = user;
  next();
});
