const router = require("express").Router();

const ranking = require("./ranking.routes");
const teams = require("./teams.routes");
const profil = require("./profil.routes");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const postRoutes = require("./post.routes");
const { getPosts } = require("../queries/post.queries");
const { isAdmin } = require("../security/isAdmin");
require("../database/index");

router.use("/classement", ranking);
router.use("/equipes", teams);
router.use("/profil", profil);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/post", postRoutes);

router.get("/", async (req, res) => {
  try {
    const posts = await getPosts();
    const admin = isAdmin(req);
    res.render("home", { posts: posts, user: req.user, admin: admin });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
