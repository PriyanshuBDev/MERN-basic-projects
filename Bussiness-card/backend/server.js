const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const cardRoute = require("./routes/card");
const adminRoute = require("./routes/admin");
app.use(cors());
app.use(express.json());
app.use("/admin", adminRoute);
app.use("/card", cardRoute);

try {
  // mongoose.connect("process.env.MONGO_URL", {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  mongoose.connect("process.env.MONGO_URL");

  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
} catch (e) {
  console.log("Error:", e);
}
