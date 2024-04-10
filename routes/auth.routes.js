const {
  login,
  sessionCreate,
  sessionDelete,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.get("/login", login);
router.post("/login", sessionCreate);
router.post("/login/profil", sessionCreate);
router.get("/logout", sessionDelete);

module.exports = router;
