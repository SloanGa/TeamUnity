const app = require("../app");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { clientPromise } = require("../database");
require("dotenv").config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    name: process.env.SESSION_NAME,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
    },
    store: MongoStore.create({
      clientPromise: clientPromise,
      mongoUrl: process.env.SERVE_MONGO,
      dbName: process.env.DB_NAME,
      ttl: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
    }),
  })
);
