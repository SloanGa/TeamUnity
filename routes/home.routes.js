const { connect } = require("../controllers/home.controller");

const router = require("express").Router();

router.post("/", connect);

module.exports = router;
