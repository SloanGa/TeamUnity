const mongoose = require("mongoose");
const env = require(`../environment/${process.env.NODE_ENV}`);

exports.clientPromise = mongoose
  .connect(env.dbUrl)
  .then((m) => {
    m.connection.getClient();
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
