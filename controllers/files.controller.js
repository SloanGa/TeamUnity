const { upload } = require("../config/upload.config");

exports.changeAvatarProfil = [
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const sessionUser = req.user;
      sessionUser.avatar = `/${req.file.filename}`;
      await sessionUser.save();
      res.redirect("/profil");
    } catch (e) {
      console.log(e);
    }
  },
];

exports.uploadFile = [
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      console.log("upload");
    } catch (e) {
      console.log(e);
    }
  },
];
