const router = require("express").Router();
const home = require("./home.routes");
const ranking = require("./ranking.routes");
const teams = require("./teams.routes");

router.use("/home", home);
router.use("/classement", ranking);
router.use("/equipes", teams);

router.get("/", (req, res) => {
  res.render("index.html");
});

module.exports = router;
