const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function isUser(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token || !authHeader.startsWith("Bearer ")) {
    console.log("here");
    return res.status(401).json({
      msg: "Token not found",
    });
  }
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    if (!verified.userId) {
      return res.status(403).json({
        msg: "Invalid token payload",
      });
    }
    req.userId = verified.userId;
    next();
  } catch (e) {
    console.log("Error:", e);
    return res.status(403).json({
      msg: "Error encountered",
    });
  }
}
module.exports = isUser;
