const mongoose = require("mongoose");
const schema = mongoose.Schema;

let date = new Date();

const dateParser = (str) => {
  let newDate = new Date(str).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return newDate;
};

const hourParser = (str) => {
  let newHour = new Date(str).toLocaleTimeString("fr-FR", {
    hour: "numeric",
    minute: "numeric",
    hour12: false, // Utilise le format 24 heures
  });
  return newHour;
};

const postSchema = schema(
  {
    username: { type: String },
    team: { type: String },
    message: { type: String, required: true },
    avatar: { type: String },
    date: { type: String, default: dateParser(date) },
    hour: { type: String, default: hourParser(date) },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
