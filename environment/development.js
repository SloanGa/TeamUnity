const path = require("path");

module.exports = {
  cert: path.join(__dirname, "../ssl/cert.pem"),
  key: path.join(__dirname, "../ssl/key.pem"),
};
