const router = require("express").Router();
const { upload } = require("../config/upload.config");

router.post("/imageform", upload.single("image"), (req, res, next) => {
  console.log(req.file);
  res.redirect("/");
});
module.exports = router;
