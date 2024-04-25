const Post = require("../database/models/post.model");
const {
  findTeam,
  findOneTeam,
  upDateTeamsScore,
} = require("../queries/team.queries");

exports.showTeams = async (req, res, next) => {
  const teamId = req.params.teamId;
  const team = await findOneTeam(teamId);
  res.render("teams", {
    userSession: req.user,
    team: team,
  });
};

exports.addNewScore = async (req, res, next) => {
  try {
    const body = req.body;
    const team1 = body.team1;
    const team1Db = await findOneTeam(team1);
    const team2 = body.team2;
    const team2Db = await findOneTeam(team2);
    const score1 = body.score1;
    const score2 = body.score2;
    await upDateTeamsScore(team1Db, team2Db, score1, score2);
    res.redirect("/profil");

    // Create a new post
    const dateParser = () => {
      let newDate = new Date().toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return newDate;
    };

    const hourParser = (str) => {
      let newHour = new Date().toLocaleTimeString("fr-FR", {
        hour: "numeric",
        minute: "numeric",
        hour12: false, // Utilise le format 24 heures
      });
      return newHour;
    };

    const post = await new Post({
      username: req.user.username,
      team: req.user.team.teamname,
      message: `Dernier match : ${team1Db.teamname} contre  ${team2Db.teamname} Score : ${score1} à ${score2}`,
      avatar: req.user.avatar,
      date: dateParser(),
      hour: hourParser(),
    });
    post.save();
  } catch (err) {
    next(err);
  }
};
