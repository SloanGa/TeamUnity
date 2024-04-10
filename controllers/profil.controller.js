const { findOneTeam } = require("../queries/team.queries");
const { findUsers } = require("../queries/user.queries");
const { isAdmin } = require("../security/isAdmin");

exports.showProfil = async (req, res, next) => {
  const id = req.user.team.team_id;
  const team = await findOneTeam(id);
  const users = await findUsers();
  const admin = isAdmin(req);
  res.render("profil", {
    userSession: req.user,
    players: team.players,
    users: users,
    admin: admin,
  });
};

exports.loginInProfil = (req, res, next) => {
  res.render("loginBis", { userSession: req.user });
};

exports.loginBeforeShowProfil = (req, res, next) => {
  res.redirect("/profil/auth/login");
};
