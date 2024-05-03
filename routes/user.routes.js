const {
  signup,
  userCreate,
  userDelete,
  userEdit,
  emailVerification,
  initResetPassword,
  resetPasswordForm,
  resetPassword,
} = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/signup", signup);
router.post("/", userCreate);
router.post("/edit/profil", userEdit);
router.post("/delete/profil", userDelete);
router.get("/email-verification/:userId/:token", emailVerification);
router.post("/forgot-password", initResetPassword);
router.get("/reset-password/:userId/:token", resetPasswordForm);
router.post("/reset-password/:userId/:token", resetPassword);

module.exports = router;
