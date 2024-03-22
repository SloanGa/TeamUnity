const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.SERVE_MONGO)
  .then((err) => console.log("connexion ok"))
  .catch((err) => console.log(err));
