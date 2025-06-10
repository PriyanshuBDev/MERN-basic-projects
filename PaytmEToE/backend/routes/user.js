const express = require("express");
const router = express.Router();
const { UserDb, AccountsTableDb } = require("../db");
const userSchema = require("../extras/zod");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const isUser = require("../middlewares/middleware");
const mongoose = require("mongoose");

router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  const response = userSchema.safeParse({
    username,
    firstName,
    lastName,
    password,
  });
  if (!response.success) {
    return res.status(403).json({
      msg: "Invalid inputs",
    });
  }
  const hashed = await bcrypt.hash(password, 10);
  const userExist = await UserDb.findOne({ username });
  if (userExist) {
    return res.status(409).json({
      msg: "Username already exist",
    });
  }
  try {
    const userData = await UserDb.create({
      username,
      firstName,
      lastName,
      password: hashed,
    });

    const userId = userData._id;
    await AccountsTableDb.create({
      userId,
      balance: Math.round((1 + Math.random() * 10000) * 100) / 100,
    });
    const token = jwt.sign({ userId: userData._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      msg: "User created successfully",
      token,
    });
  } catch (e) {
    console.log("Error:", e);
    res.status(400).json({
      msg: "Error encountered",
    });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const response = userSchema.partial().safeParse({ username, password });
  if (!response.success) {
    return res.status(403).json({
      msg: "Invalid inputs",
    });
  }
  const userExist = await UserDb.findOne({
    username,
  });
  if (!userExist) {
    return res.status(404).json({
      msg: "User not found either re-check your credentials or signup",
    });
  }
  const match = await bcrypt.compare(password, userExist.password);
  if (match) {
    const token = jwt.sign({ userId: userExist._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      msg: "User signed in",
      token,
    });
  } else {
    return res.status(401).json({
      msg: "Password doesn't match",
    });
  }
});

router.put("/update", isUser, async (req, res) => {
  const userId = req.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      msg: "Invalid id format",
    });
  }
  const updatedUser = {};
  const { firstName, lastName, password } = req.body;
  const response = userSchema.partial().safeParse(req.body);
  if (!response.success) {
    return res.status(403).json({
      msg: "Invalid inputs",
    });
  }

  if (firstName) updatedUser.firstName = firstName;
  if (lastName) updatedUser.lastName = lastName;
  if (password) {
    try {
      const hashed = await bcrypt.hash(password, 10);
      updatedUser.password = hashed;
    } catch (e) {
      console.log("Error:", e);
      return res.status(500).json({
        msg: "Error hashing the password",
      });
    }
  }

  try {
    const success = await UserDb.findByIdAndUpdate(
      userId,
      { $set: updatedUser },
      {
        new: true,
      }
    );
    if (!success) {
      return res.status(404).json({
        msg: "No user found",
      });
    }

    return res.status(200).json({
      msg: "User credentials updated",
    });
  } catch (e) {
    console.log("Error:", e);
    return res.status(400).json({
      msg: "Error encountered",
    });
  }
});

router.get("/bulk", isUser, async (req, res) => {
  const { filter } = req.query;
  const loggedId = req.userId;
  if (!filter || typeof filter !== "string") {
    return res.status(400).json({ msg: "Missing or invalid 'filter' query" });
  }
  try {
    const users = await UserDb.find({
      _id: { $ne: loggedId },
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });
    if (!users || users.length === 0) {
      return res.status(404).json({
        msg: "No matching user found",
      });
    }
    res.status(200).json({
      msg: "Users found",
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (e) {
    console.log("Error:", e);
    return res.status(500).json({
      msg: "Error encountered",
    });
  }
});

router.get("/username", isUser, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await UserDb.findById(userId);
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    return res.json({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (e) {
    console.log("Error:", e);
    return res.status(400).json({
      msg: "Error encountered",
    });
  }
});

module.exports = router;
