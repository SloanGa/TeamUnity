const app = require("../app");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { clientPromise } = require("../database");
const env = require(`../environment_st/${process.env.NODE_ENV}`);
require("dotenv").config();

app.use(
  session({
    secret: env.sessionSecret,
    resave: false,
    name: env.sessionName,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
    },
    store: MongoStore.create({
      clientPromise: clientPromise,
      mongoUrl: env.dbUrl,
      dbName: env.dbName,
      ttl: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
    }),
  })
);
