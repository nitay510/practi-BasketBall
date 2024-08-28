// services/gameService.js

const Game = require('../models/game');
const { startOfDay, endOfDay } = require('date-fns');

/**
 * Creates a new game.
 * The function takes the game data as input, sets the game date to the current date, and saves it to the database.
 * @param {Object} gameData - The data of the game to be created.
 * @returns {Object} The newly created game.
 */
async function createGame(gameData) {
  const game = new Game({
    ...gameData,
    gameDate: new Date() // Setting the date to now when the game is created
  });
  await game.save();
  return game;
}

/**
 * Retrieves a game by date and team names.
 * The function finds a game that occurred on a specific date between two teams.
 * @param {string} gameDate - The date of the game.
 * @param {string} teamName - The name of one team.
 * @param {string} rivalTeamName - The name of the rival team.
 * @returns {Array} An array of games that match the criteria.
 */
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
  });

  return games.map(game => ({
    gameDate: game.gameDate,
    teamName: game.teamName,
    rivalTeamName: game.rivalTeamName,
    myTeamScore: game.myTeamScore,
    otherTeamScore: game.otherTeamScore,
    playerStats: game.playersStats
  }));
}

/**
 * Retrieves all games for a specific team.
 * The function returns all games that a particular team has played.
 * @param {string} teamName - The name of the team.
 * @returns {Array} An array of games played by the team.
 */
async function getAllGamesForTeam(teamName) {
  const games = await Game.find({ 'teamName': teamName });
  return games.map(game => ({
    gameDate: game.gameDate,
    teamName: game.teamName,
    rivalTeamName: game.rivalTeamName,
    myTeamScore: game.myTeamScore,
    otherTeamScore: game.otherTeamScore,
    playerStats: game.playersStats
  }));
}

/**
 * Retrieves all games for a specific player within a team.
 * The function returns all games in which the player participated, sorted by date in descending order.
 * @param {string} playerName - The name of the player.
 * @param {string} teamName - The name of the team.
 * @returns {Array} An array of games in which the player participated.
 */
async function getAllGamesForPlayer(playerName, teamName) {
  const games = await Game.find({
    'playersStats.name': playerName,
    'teamName': teamName
  }).sort({ gameDate: -1 });

  return games.map(game => ({
    gameDate: game.gameDate,
    teamName: game.teamName,
    rivalTeamName: game.rivalTeamName,
    myTeamScore: game.myTeamScore,
    otherTeamScore: game.otherTeamScore,
    playerStats: game.playersStats.find(p => p.name === playerName)
  }));
}

/**
 * Deletes a game based on the date and team names.
 * The function deletes the game that matches the specified date, team name, and rival team name.
 * @param {string} gameDate - The date of the game.
 * @param {string} teamName - The name of the team.
 * @param {string} rivalTeamName - The name of the rival team.
 * @returns {Object|null} The deleted game document or null if not found.
 */
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

/**
 * Calculates the total number of wins and losses for a team.
 * The function iterates through all games for the specified team and counts the wins and losses.
 * @param {string} teamName - The name of the team.
 * @returns {Object} An object containing the number of wins and losses.
 */
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
  calculateTeamWinsAndLosses
};
