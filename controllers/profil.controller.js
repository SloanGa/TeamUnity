const { findTeam } = require("../queries/team.queries");
const { findUsers } = require("../queries/user.queries");
const { isAdmin } = require("../security/isAdmin");

exports.showProfil = async (req, res, next) => {
  try {
    const teams = await findTeam();
    const admin = isAdmin(req);
    res.render("profil", {
      userSession: req.user,
      teams: teams,
      admin: admin,
    });
  } catch (e) {
    next(e);
  }
};

exports.loginInProfil = (req, res, next) => {
  res.render("loginBis", { userSession: req.user });
};

exports.loginBeforeShowProfil = (req, res, next) => {
  res.redirect("/profil/auth/login");
};
