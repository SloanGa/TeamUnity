const { findTeam } = require("../queries/team.queries");
const { createUser } = require("../queries/user.queries");
const { updateTeam } = require("../queries/team.queries");
const { editUser, deleteUser } = require("../queries/user.queries");
require("passport");

exports.signup = async (req, res, next) => {
  try {
    const teams = await findTeam();
    res.render("signup", { teams: teams });
  } catch (e) {
    next(e);
  }
};

exports.userCreate = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await createUser(body);
    const teamId = body.team;
    await updateTeam(teamId, { players: user.username });
    req.login(user, (err) => {
      if (err) {
        return next(err);
      } else {
        res.redirect("/");
      }
    });
  } catch (e) {
    console.log(e);
    res.render("signup", { error: e.message });
    // res.statut(404);
  }
};

exports.userDelete = async (req, res, next) => {
  try {
    const id = req.user.id;
    await deleteUser(id);
    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.userEdit = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.user.id;
    const body = req.body;
    const teamId = body.team;
    await updateTeam(teamId, { players: user.username });
    await editUser(id, body);
    res.redirect("/profil");
  } catch (e) {
    next(e);
  }
};
