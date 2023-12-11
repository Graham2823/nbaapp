const mongoose = require('mongoose');

mongoose.models = {}; // Clear existing models
const playerSchema = new mongoose.Schema({
  name: String,
  team: String,
  stats: {
    games_played: Number,
    min: String,
    points: Number,
    assists: Number,
    rebounds: Number,
    blocks: Number,
    steals: Number,
    turnovers: Number,
    fg_pct: Number,
    fg3_pct: Number,
    ft_pct: Number,
  },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
