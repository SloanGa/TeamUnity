exports.showRanking = (req, res, next) => {
  res.render("ranking", { user: req.user });
};
