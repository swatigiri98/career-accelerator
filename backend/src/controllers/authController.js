import User from "../models/User.js";
import CareerScore from "../models/CareerScore.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, targetRole } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    res.status(409);
    throw new Error("An account with this email already exists");
  }

  const passwordHash = await User.hashPassword(password);
  const user = await User.create({ name, email, passwordHash, targetRole: targetRole || "" });

  // Initialize an empty career score so the dashboard has something to read immediately.
  await CareerScore.create({ user: user._id, score: 0, breakdown: { resumeScore: 0, interviewScore: 0, roadmapScore: 0 } });

  res.status(201).json({
    success: true,
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, targetRole: user.targetRole },
  });
});

/**
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    success: true,
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, targetRole: user.targetRole },
  });
});

/**
 * GET /api/auth/me
 */
export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});
