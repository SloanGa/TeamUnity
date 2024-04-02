exports.showProfil = (req, res, next) => {
  res.render("profil", { user: req.user });
};
