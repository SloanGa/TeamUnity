console.log("Database connection");
const mongoose = require("mongoose");
const env = require(`../environment_st/${process.env.NODE_ENV}`);
console.log("connnecting to", env.dbUrl);

exports.clientPromise = mongoose
  .connect(env.dbUrl)
  .then((m) => {
    m.connection.getClient();
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
