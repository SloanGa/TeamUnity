const {
  updateTeam,
  findOneTeam,
  findTeam,
  findTeamAndPullPlayers,
} = require("../queries/team.queries");
const User = require("../database/models/users.model");
const { createUser, editUser, deleteUser } = require("../queries/user.queries");
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
    const nextTeamId = body.team;
    await updateTeam(nextTeamId, { players: user.username });
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
    const body = req.body;
    const user = req.user;
    const userId = req.user.id;
    const currentTeamId = user.team.team_id;

    let nextTeamId = body.team;
    if (nextTeamId === "") {
      nextTeamId = user.team.team_id;
      teamName = user.team.teamname;
      team = await findOneTeam(nextTeamId);
    } else {
      team = await findOneTeam(nextTeamId);
      teamName = team.teamname;
    }

    let password = body.password;
    if (!password) {
      password = user.local.password;
    } else {
      password = await User.hashPassword(body.password);
    }

    let username = body.username;
    if (!username) {
      username = user.username;
    }
    await findTeamAndPullPlayers(currentTeamId, user.username);
    await updateTeam(nextTeamId, { players: user.username });
    await editUser(userId, username, nextTeamId, teamName, password);
    res.redirect("/profil");
  } catch (e) {
    next(e);
  }
};
