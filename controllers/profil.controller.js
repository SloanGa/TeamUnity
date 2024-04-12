const { findOneTeam, findTeam } = require("../queries/team.queries");
const { findUsers } = require("../queries/user.queries");
const { isAdmin } = require("../security/isAdmin");

exports.showProfil = async (req, res, next) => {
  try {
    const id = req.user.team.team_id;
    const team = await findOneTeam(id);
    const teams = await findTeam();
    const users = await findUsers();
    const admin = isAdmin(req);
    res.render("profil", {
      userSession: req.user,
      players: team.players,
      teams: teams,
      users: users,
      admin: admin,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.loginInProfil = (req, res, next) => {
  res.render("loginBis", { userSession: req.user });
};

exports.loginBeforeShowProfil = (req, res, next) => {
  res.redirect("/profil/auth/login");
};
