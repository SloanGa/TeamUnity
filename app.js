const path = require("path");
const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const app = express();
const port = process.env.PORT || 5000;

exports.app = app;

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
// app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("short"));
app.use(router);

app.listen(port);
console.log("server started");
