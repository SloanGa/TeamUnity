const User = require("../database/models/users.model");
const { findOneTeam } = require("./team.queries");

exports.createUser = async (body) => {
  try {
    const hashedPassword = await User.hashPassword(body.password);
    const teamId = body.team;
    const team = await findOneTeam(teamId);
    const teamName = team.teamname;

    const user = new User({
      username: body.username,
      local: {
        email: body.email,
        password: hashedPassword,
      },
      team: {
        team_id: teamId,
        teamname: teamName,
      },
    });
    return user.save();
  } catch (e) {
    throw e;
  }
};

exports.deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

exports.editUser = async (id, username, teamId, teamName, password) => {
  try {
    await User.findByIdAndUpdate(id, {
      username: username,
      "team.team_id": teamId,
      "team.teamname": teamName,
      "local.password": password,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.findUserPerEmail = async (email) => {
  return User.findOne({ "local.email": email });
};

exports.findUsers = async () => {
  return User.find({});
};
