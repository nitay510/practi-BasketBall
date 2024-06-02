// services/gameService.js

const Game = require('../models/game');
const { startOfDay, endOfDay } = require('date-fns');
async function createGame(gameData) {
  const game = new Game({
    ...gameData,
    gameDate: new Date() // Setting the date to now when the game is created
  });
  await game.save();
  return game;
}

async function getGameByDateAndTeam(gameDate, teamName, rivalTeamName) {
  // Parse the gameDate to a JavaScript Date object
  const date = new Date(gameDate);

  // Get the start and end of the day for the given date
  const start = startOfDay(date);
  const end = endOfDay(date);
  // Use a MongoDB query to find a game between the start and end of the day
  const games = await Game.find({
    gameDate: { $gte: start, $lt: end },
    teamName: teamName,
    rivalTeamName: rivalTeamName
  })
  return games.map(game => ({
    gameDate: game.gameDate,
    teamName: game.teamName,
    rivalTeamName: game.rivalTeamName,
    myTeamScore:game.myTeamScore,
    otherTeamScore:game.otherTeamScore,
    playerStats: game.playersStats
  }));
}

async function getAllGamesForTeam(teamName) {
  const games = await Game.find({ 'teamName': teamName})
  return games.map(game => ({
    gameDate: game.gameDate,
    teamName: game.teamName,
    rivalTeamName: game.rivalTeamName,
    myTeamScore:game.myTeamScore,
    otherTeamScore:game.otherTeamScore,
    playerStats: game.playersStats
  }));
}

async function getAllGamesForPlayer(playerName, teamName) {
    const games = await Game.find({
      'playersStats.name': playerName,
      'teamName': teamName
    }).sort({ gameDate: -1 });
  
    return games.map(game => ({
      gameDate: game.gameDate,
      teamName: game.teamName,
      rivalTeamName: game.rivalTeamName,
      myTeamScore:game.myTeamScore,
      otherTeamScore:game.otherTeamScore,
      playerStats: game.playersStats.find(p => p.name === playerName)
    }));
  }
  async function deleteGameByDateAndTeams(gameDate, teamName, rivalTeamName) {
    // Convert the game date to the correct format
    const date = new Date(gameDate);
  
    // Delete the game that matches the criteria
    const result = await Game.findOneAndRemove({
      gameDate: date,
      teamName,
      rivalTeamName
    });
  
    return result; // Returns the deleted document or null if not found
  }
  async function calculateTeamWinsAndLosses(teamName) {
    // Retrieve all games for the specified team
    const games = await Game.find({ teamName });
    
    let wins = 0;
    let losses = 0;
  
    // Calculate wins and losses based on scores
    games.forEach(game => {
      if (game.myTeamScore > game.otherTeamScore) {
        wins++;
      } else {
        losses++;
      }
    });
  
    return { wins, losses };
  }
  module.exports = {
    createGame,
    getGameByDateAndTeam,
    getAllGamesForTeam,
    getAllGamesForPlayer,
    deleteGameByDateAndTeams,
    calculateTeamWinsAndLosses // Add this here
  };