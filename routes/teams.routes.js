const { showTeams } = require("../controllers/teams.controller");

const router = require("express").Router();

router.get("/", showTeams);

module.exports = router;
