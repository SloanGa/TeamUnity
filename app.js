const path = require("path");
const express = require("express");

const morgan = require("morgan");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 5000;

exports.app = app;

require("./config/sessions.config");
require("./config/passport.config");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(morgan("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port);
console.log("server started");
