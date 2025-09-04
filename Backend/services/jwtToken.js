const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

function createToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}
function verifyToken(token) {
  const decoded = jwt.verify(token, secret);
  return decoded;
}
module.exports = {
  createToken,
  verifyToken,
};
