const mongoose = require("mongoose");

const UserSch = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 100,
  },
  account: {
    ref: "Account",
    type: mongoose.Schema.Types.ObjectId,
  },
});

const AccountsTableSch = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const UserDb = mongoose.model("User", UserSch);
const AccountsTableDb = mongoose.model("Account", AccountsTableSch);
module.exports = {
  UserDb,
  AccountsTableDb,
};
