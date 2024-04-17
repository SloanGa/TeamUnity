const {
  signup,
  userCreate,
  userDelete,
  userEdit,
} = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/signup", signup);
router.post("/", userCreate);
router.post("/edit/profil", userEdit);
router.post("/delete/profil", userDelete);

module.exports = router;
