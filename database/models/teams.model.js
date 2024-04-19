const mongoose = require("mongoose");
const schema = mongoose.Schema;

const teamSchema = schema({
  teamname: { type: String },
  captain: { type: String },
  players: { type: Array },
  rank: {
    playing: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    looses: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
  },
});

const Team = mongoose.model("team", teamSchema);

// const team = new Team({
//   teamname: "",
//   captain: "",
//   players: [],
// });

// team.save();

module.exports = Team;
