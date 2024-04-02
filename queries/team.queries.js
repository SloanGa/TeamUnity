const Team = require("../database/models/teams.model");

exports.findTeam = async () => {
  return Team.find({}).sort({ teamname: 1 });
};

exports.findOneTeam = async (id) => {
  return Team.findOne({ _id: id });
};

exports.updateTeam = async (teamId, players) => {
  return Team.findByIdAndUpdate(teamId, { $push: players });
};
