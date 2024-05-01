const path = require("path");

module.exports = {
  dbUrl:
    "mongodb+srv://sloangauthier:jpRWBfAOgaOo1Yey@cluster0.xwxph3s.mongodb.net/TeamUnity",
  dbName: "TeamUnity",
  sessionName: "SID",
  sessionSecret: "fil4533",
  cert: path.join(__dirname, "../ssl/cert.pem"),
  key: path.join(__dirname, "../ssl/key.pem"),
};
