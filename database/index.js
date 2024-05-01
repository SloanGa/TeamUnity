const mongoose = require("mongoose");
require("dotenv").config();

exports.clientPromise = mongoose
  .connect(process.env.SERVE_MONGO)
  .then((m) => {
    m.connection.getClient();
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
