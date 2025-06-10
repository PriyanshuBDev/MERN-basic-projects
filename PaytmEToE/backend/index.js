const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const mainRoute = require("./routes/index");
app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRoute);
try {
  mongoose.connect("mongoDB_URL");
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
} catch (e) {
  console.log("Error:", e);
}
