const jwt = require("jsonwebtoken");
const { jwtPassword } = require("../extras/config.js");

function isAdmin(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(404).json({
      msg: "Token not found",
    });
  }

  try {
    const verify = jwt.verify(token, jwtPassword);
    if (!verify.username) {
      return res.status(403).json({
        msg: "Verification failed",
      });
    }
    next();
  } catch (e) {
    console.log("Error:", e);
    return res.status(400).json({
      msg: "Error encounterd",
    });
  }
}

module.exports = { isAdmin };
