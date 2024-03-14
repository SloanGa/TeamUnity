const { showRanking } = require("../controllers/ranking.controller");

const router = require("express").Router();

router.get("/home", showRanking);

module.exports = router;
