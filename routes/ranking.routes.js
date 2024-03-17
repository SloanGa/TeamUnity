const { showRanking } = require("../controllers/ranking.controller");

const router = require("express").Router();

router.get("/", showRanking);

module.exports = router;
