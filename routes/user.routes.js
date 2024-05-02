const {
  signup,
  userCreate,
  userDelete,
  userEdit,
  emailVerification,
  initResetPassword,
} = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/signup", signup);
router.post("/", userCreate);
router.post("/edit/profil", userEdit);
router.post("/delete/profil", userDelete);
router.get("/email-verification/:userId/:token", emailVerification);
router.post("/forgot-password", initResetPassword);

module.exports = router;
