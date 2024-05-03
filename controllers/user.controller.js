const {
  updateTeam,
  findOneTeam,
  findTeam,
  findTeamAndPullPlayers,
} = require("../queries/team.queries");
const User = require("../database/models/users.model");
const {
  createUser,
  editUser,
  deleteUser,
  findUserPerId,
  findUserPerEmail,
} = require("../queries/user.queries");
require("passport");
const { v4: uuidv4 } = require("uuid");
const emailFactory = require("../emails/index");
const moment = require("moment");

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
    emailFactory.sendEmailVerification({
      to: user.local.email,
      host: req.headers.host,
      username: user.username,
      userId: user._id,
      token: user.local.emailToken,
    });
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
    const user = req.user;
    const currentTeamId = user.team.team_id;
    const userId = req.user.id;
    await findTeamAndPullPlayers(currentTeamId, user.username);
    await deleteUser(userId);
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

exports.emailVerification = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const user = await findUserPerId(userId);

    if (user && token && token === user.local.emailToken) {
      user.local.emailVerified = true;
      await user.save();
      res.redirect("/");
    } else {
      return res.status(400).json("Problem during email verification");
    }
  } catch (e) {
    next(e);
  }
};

exports.initResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email) {
      const user = await findUserPerEmail(email);
      if (user) {
        user.local.passwordToken = uuidv4();
        user.local.passwordTokenExpiration = moment().add(2, "hours").toDate();
        await user.save();
        emailFactory.sendResetPasswordLink({
          to: email,
          host: req.headers.host,
          userId: user._id,
          token: user.local.passwordToken,
        });
        return res.status(200).end();
      }
    }
    return res.status(400).json("Utilisateur inconnu");
  } catch (e) {
    next(e);
  }
};

exports.resetPasswordForm = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const user = await findUserPerId(userId);
    if (user && user.local.passwordToken === token) {
      res.render("resetPasswordForm"),
        {
          url: `https://${req.headers.host}/users/reset-password/${user._id}/${user.local.passwordToken}`,
          error: null,
        };
    } else {
      return res.status(400).json("Utilisateur introuvable");
    }
  } catch (e) {
    next(e);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;
    const user = await findUserPerId(userId);
    if (
      password &&
      user &&
      user.local.passwordToken === token &&
      moment() < moment(user.local.passwordTokenExpiration)
    ) {
      user.local.password = await User.hashPassword(password);
      user.local.passwordToken = null;
      user.local.passwordTokenExpiration = null;
      await user.save();
      return res.redirect("/");
    } else {
      res.render("resetPasswordForm"),
        {
          url: `https://${req.headers.host}/users/reset-password/${user._id}/${user.local.passwordToken}`,
          error: ["Une erreur s'est produite"],
        };
    }
  } catch (e) {
    next(e);
  }
};
