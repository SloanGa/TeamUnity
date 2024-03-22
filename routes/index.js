const router = require("express").Router();
const home = require("./home.routes");
const ranking = require("./ranking.routes");
const teams = require("./teams.routes");
const profil = require("./profil.routes");
const userRoutes = require("./user.routes");

router.use("/home", home);
router.use("/classement", ranking);
router.use("/equipes", teams);
router.use("/profil", profil);
router.use("/users", userRoutes);

router.get("/", (req, res) => {
  res.redirect("/home");
});

module.exports = router;
