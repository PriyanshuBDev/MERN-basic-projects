const mongoose = require("mongoose");

const AdminSch = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true }
);

const CardSch = new mongoose.Schema(
  {
    name: String,
    description: String,
    interests: [String],
    social: {
      linkedin: String,
      twitter: String,
    },
  },
  { timestamps: true }
);

const AdminDb = mongoose.model("Admin2", AdminSch);
const CardDb = mongoose.model("Cards", CardSch);

module.exports = {
  AdminDb,
  CardDb,
};
