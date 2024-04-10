const { findTeam } = require("../queries/team.queries");

exports.showTeams = async (req, res, next) => {
  const teams = await findTeam();
  res.render("teams", {
    userSession: req.user,
    teams: teams,
  });
};
