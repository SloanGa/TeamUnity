const {
  showProfil,
  loginBeforeShowProfil,
  showProfilBis,
  loginInProfil,
} = require("../controllers/profil.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  req.user ? showProfil(req, res) : loginBeforeShowProfil(req, res);
});
router.get("/auth/login", loginInProfil);

module.exports = router;
