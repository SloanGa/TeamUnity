const { signup, userCreate } = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/signup", signup);
router.post("/", userCreate);

module.exports = router;
