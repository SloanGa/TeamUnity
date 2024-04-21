const { findTeam } = require("../queries/team.queries");
const { createUser } = require("../queries/user.queries");
const { updateTeam, findOneTeam } = require("../queries/team.queries");
const User = require("../database/models/users.model");
const { editUser, deleteUser } = require("../queries/user.queries");
const passport = require("passport");
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
    let team;
    let teamName;
    let password = req.body.password;
    const body = req.body;
    const user = req.user;
    const id = req.user.id;
    let teamId = body.team;
    if (teamId === "") {
      teamId = user.team.team_id;
      teamName = user.team.teamname;
      team = await findOneTeam(teamId);
    } else {
      team = await findOneTeam(teamId);
      teamName = team.teamname;
    }
    if (password === null) {
      password = user.local.password;
    } else if (body.password !== "") {
      password = await User.hashPassword(body.password);
    }
    const username = body.username;

    if (!username) {
      username = user.username;
    }

    console.log({ teamId, teamName, password, username, user });
    // await updateTeam(teamId, { players: user.username });
    await editUser(id, username, teamId, teamName, password);
    res.redirect("/profil");
  } catch (e) {
    next(e);
  }
};
