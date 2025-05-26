const express = require("express");
const router = express.Router();
const { AdminSchema } = require("../extras/z");
const jwt = require("jsonwebtoken");
const { jwtPassword } = require("../extras/config");
const { AdminDb } = require("../db/index");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const response = AdminSchema.safeParse({
    username,
    password,
  });
  if (!response.success) {
    return res.status(403).json({
      msg: "Invalid inputs",
    });
  }

  const userExists = await AdminDb.findOne({ username });
  if (userExists) {
    return res.status(409).json({
      msg: "Username already exists",
    });
  }
  try {
    await AdminDb.create({ username, password });
    return res.status(200).json({
      msg: "Admin created",
    });
  } catch (e) {
    console.log("Error:", e);
    return res.status(400).json({
      msg: "Error encountered",
    });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const userExists = await AdminDb.findOne({ username, password });
  if (!userExists) {
    return res.status(404).json({
      msg: "Admin not found, either re-check your credentials or signup",
    });
  }
  var token = jwt.sign({ username }, jwtPassword, { expiresIn: "1h" });
  res.json({
    msg: "Admin signed in",
    token: token,
  });
});

module.exports = router;
