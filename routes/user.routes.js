const { signin, login, userCreate } = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/signin", signin);
router.post("/", userCreate);

router.get("/login", login);

module.exports = router;
