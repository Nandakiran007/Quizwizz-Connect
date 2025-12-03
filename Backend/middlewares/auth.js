const { verifyToken } = require("../services/jwtToken");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "default";
async function loginRestricted(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    const error = new Error("Unauthorized Access");
    error.status = 401;
    return next(error);
  }
  try {
    const userData = verifyToken(token);
    req.user = userData;
  } catch (err) {
    const error = new Error("Invalid or Expired Token");
    error.status = 403;
    return next(error);
  }
  next();
}
module.exports = { loginRestricted };
