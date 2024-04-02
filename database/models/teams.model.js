const mongoose = require("mongoose");
const schema = mongoose.Schema;

const teamSchema = schema({
  teamname: { type: String },
  captain: { type: String },
  players: { type: Array },
});

const Team = mongoose.model("team", teamSchema);

// const team = new Team({
//   teamname: "",
//   captain: "",
//   players: [],
// });

// team.save();

module.exports = Team;
