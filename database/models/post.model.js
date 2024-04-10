const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = schema(
  {
    username: { type: String },
    team: { type: String },
    message: { type: String, required: true },
    avatar: { type: String },
    date: { type: String },
    hour: { type: String },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
