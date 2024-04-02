const {
  postCreate,
  postList,
  postDelete,
} = require("../controllers/post.controller");

const router = require("express").Router();

router.post("/", postCreate);
// router.get("/edit/:postId")
router.get("/:postId", postDelete);

module.exports = router;
