const { findTeam } = require("../queries/team.queries");

exports.showRanking = async (req, res, next) => {
  const teams = await findTeam();
  const user = req.user;
  res.render("ranking", { userSession: user, teams: teams });
};
