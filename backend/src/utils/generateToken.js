import jwt from "jsonwebtoken";

/**
 * Signs a JWT for the given user id. Expiry is configurable via env
 * so it can be shortened/lengthened without touching auth logic.
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export default generateToken;
