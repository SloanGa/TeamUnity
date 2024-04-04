const Post = require("../database/models/post.model");
const User = require("../database/models/users.model");

exports.getPosts = () => {
  return Post.find({}).sort({ updatedAt: -1 });
};

exports.deletePost = (postId) => {
  return Post.findByIdAndDelete(postId);
};
