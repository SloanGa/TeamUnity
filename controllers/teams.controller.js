exports.showTeams = (req, res, next) => {
  res.render("teams", { user: req.user });
};
