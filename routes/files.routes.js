const router = require("express").Router();
const { changeAvatarProfil, uploadFile } = require("../controllers/files.controller");

router.post("/imageform", [uploadFile])

router.post('/avatar', [changeAvatarProfil])

module.exports = router;
