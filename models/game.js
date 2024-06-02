// models/Game.js

const mongoose = require('mongoose');

const playerStatsSchema = new mongoose.Schema({
  name: String,
  score: Number,
  assists: Number,
  rebounds: Number
});

const gameSchema = new mongoose.Schema({
  gameDate: { type: Date, required: true },
  teamName: { type: String, required: true },
  rivalTeamName: String,
  myTeamScore: Number,
  otherTeamScore: Number,
  playersStats: [playerStatsSchema]
}, { timestamps: true });

gameSchema.index({ gameDate: 1, teamName: 1 }, { unique: true });

module.exports = mongoose.model('Game', gameSchema);
