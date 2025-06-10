const express = require("express");
const isUser = require("../middlewares/middleware");
const router = express.Router();
const { AccountsTableDb } = require("../db.js");
const { default: mongoose } = require("mongoose");

router.get("/balance", isUser, async (req, res) => {
  const userId = req.userId;
  try {
    const account = await AccountsTableDb.findOne({ userId });
    if (!account) {
      return res.status(404).json({
        msg: "Error encountered",
      });
    }
    return res.json({
      balance: account.balance,
    });
  } catch (e) {
    console.log("Error:", e);
    return res.status(400).json({
      msg: "Error encoutered while getting the balance",
    });
  }
});

router.post("/transfer", isUser, async (req, res) => {
  const { to, amount } = req.body;
  if (
    typeof to !== "string" ||
    typeof amount !== "number" ||
    isNaN(amount) ||
    amount <= 0 ||
    to.trim() === ""
  ) {
    return res.status(400).json({
      msg: "Invalid account",
    });
  }
  const userId = req.userId;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const sender = await AccountsTableDb.findOneAndUpdate(
      { userId, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { session }
    );
    if (!sender) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        msg: "Insufficient balance in the users account",
      });
    }

    const receiver = await AccountsTableDb.findOneAndUpdate(
      { userId: to },
      { $inc: { balance: amount } },
      { session }
    );
    if (!receiver) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        msg: "Invalid account",
      });
    }

    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({
      msg: "Transfer successful",
    });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    console.log("Error:", e);
    return res.status(400).json({ msg: "Error encountered while transfering" });
  }
});

module.exports = router;
