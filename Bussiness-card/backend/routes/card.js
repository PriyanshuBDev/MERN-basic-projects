const express = require("express");
const router = express.Router();
const { CardSchema } = require("../extras/z");
const { CardDb } = require("../db/index");
const mongoose = require("mongoose");
const { isAdmin } = require("../middlewares/isAdmin");

router.post("/create", isAdmin, async (req, res) => {
  const createPayload = req.body;
  // console.log(
  //   "Payload received by backend:",
  //   JSON.stringify(createPayload, null, 2)
  // );
  const response = CardSchema.safeParse(createPayload);
  if (!response.success) {
    console.log(response.error.format());
    return res.status(411).json({
      msg: "Incorrect inputs",
      errors: response.error.issues,
    });
  }

  try {
    const card = await CardDb.create({
      name: createPayload.name,
      description: createPayload.description,
      interests: createPayload.interests,
      social: {
        linkedin: createPayload.social.linkedin,
        twitter: createPayload.social.twitter,
      },
    });
    res.status(200).json({
      msg: "Card created",
      id: card._id,
    });
  } catch (e) {
    console.log("Error:", e);
    res.status(400).json({
      msg: "Error encountered",
    });
  }
});

router.get("/read", async (req, res) => {
  const cards = await CardDb.find({});
  if (!cards.length) {
    return res.status(404).json({
      msg: "Cards not found",
    });
  }

  res.status(200).json({
    cards,
  });
});

router.put("/update/:id", isAdmin, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      msg: "Invalid id format",
    });
  }

  try {
    const card = await CardDb.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!card) {
      return res.status(404).json({
        msg: "No cards found",
      });
    }

    res.status(200).json({
      msg: "Card updated",
    });
  } catch (e) {
    console.log("Error:", e);
    return res.status(400).json({
      msg: "Error encountered",
    });
  }
});

router.delete("/delete/:id", isAdmin, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      msg: "Invalid id format",
    });
  }

  try {
    const card = await CardDb.findByIdAndDelete(req.params.id);
    if (!card) {
      return res.status(404).json({
        msg: "No cards found",
      });
    }

    res.status(200).json({
      msg: "Card Deleted",
    });
  } catch (e) {
    console.log("Error:", e);
    return res.status(400).json({
      msg: "Error encountered",
    });
  }
});

module.exports = router;
