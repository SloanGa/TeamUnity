const { showProfil } = require("../controllers/profil.controller");

const router = require("express").Router();

router.get("/", showProfil);

module.exports = router;
