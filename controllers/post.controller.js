const Post = require("../database/models/post.model");
const { getPosts, deletePost, editPost } = require("../queries/post.queries");
const { findAvatars } = require("../queries/user.queries");

const dateParser = () => {
  let newDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return newDate;
};

const hourParser = (str) => {
  let newHour = new Date().toLocaleTimeString("fr-FR", {
    hour: "numeric",
    minute: "numeric",
    hour12: false, // Utilise le format 24 heures
  });
  return newHour;
};

exports.postCreate = async (req, res, next) => {
  try {
    const body = req.body;
    const post = await new Post({
      username: req.user.username,
      team: req.user.team.teamname,
      message: body.message,
      avatar: req.user.avatar,
      date: dateParser(),
      hour: hourParser(),
    });
    post.save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

exports.postDelete = async (req, res, next) => {
  try {
    console.log(req.params);
    const postId = req.params.postId;
    console.log(postId);
    await deletePost(postId);
    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.postList = async (req, res, next) => {
  try {
    await getPosts();
  } catch (e) {
    next(e);
  }
};
