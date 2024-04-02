const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.SERVE_MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
