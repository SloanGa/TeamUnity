const session = require("express-session");
const MongoStore = require("connect-mongo");
const { app } = require("../app");
require("dotenv").config();
require("../database");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    name: process.env.SESSION_NAME,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 14 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.SESSION_SERVE,
      dbName: process.env.DB_NAME,
      ttl: 60 * 60 * 24 * 14 * 1000,
    }),
  })
);
