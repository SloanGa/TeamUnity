const Team = require("../database/models/teams.model");

exports.findTeam = async () => {
  return Team.find({}).sort({ teamname: 1 });
};

exports.findTeamAndPullPlayers = async (currentTeamId, username) => {
  return Team.findByIdAndUpdate(currentTeamId, {
    $pull: { players: username },
  });
};

exports.findOneTeam = async (id) => {
  return Team.findOne({ _id: id });
};

exports.updateTeam = async (nextTeamId, username) => {
  return Team.findByIdAndUpdate(nextTeamId, { $push: username });
};

exports.upDateTeamsScore = async (team1Db, team2Db, score1, score2) => {
  team1Db.rank.playing += 1;
  team2Db.rank.playing += 1;

  if (score1 > score2) {
    team1Db.rank.points += 3;
    team1Db.rank.wins += 1;
    team2Db.rank.looses += 1;
  } else if (score1 < score2) {
    team2Db.rank.points += 3;
    team2Db.rank.wins += 1;
    team1Db.rank.looses += 1;
  } else {
    team1Db.rank.points += 1;
    team2Db.rank.points += 1;
    team1Db.rank.draws += 1;
    team2Db.rank.draws += 1;
  }

  return Promise.all([team1Db.save(), team2Db.save()]);
};
