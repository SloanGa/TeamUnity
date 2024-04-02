const Post = require("../database/models/post.model");

exports.getPosts = () => {
  return Post.find({}).sort({ updatedAt: -1 });
};

exports.deletePost = (postId) => {
  return Post.findByIdAndDelete(postId);
};
