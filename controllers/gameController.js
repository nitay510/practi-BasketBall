// controllers/gameController.js

const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const gameService = require('../services/gameService');
const teamService = require('../services/teamsService');
const userService = require('../services/userService'); // Import user service
const admin = require('../fireBaseAdmin');
/**
 * Creates a new game using the provided data in the request body.
 * After creating the game, it sends notifications to all players in the team.
 */
exports.createGame = async (req, res) => {
  try {
    // Create the new game using the game service
    const newGame = await gameService.createGame(req.body);

    // Fetch the team information to get the list of players
    const team = await teamService.getTeamByName(req.body.teamName);
    if (!team) {
      return res.status(404).send('Team not found');
    }

    // Fetch FCM tokens of all players in the team
    const playersUsernames = team.players; // List of player usernames

    // Fetch user details for the players
    const players = await userService.getUsersByUsernames(playersUsernames);

    // Filter out players who don't have an FCM token
    const tokens = players
      .filter(player => player.fcmToken)
      .map(player => player.fcmToken);

    if (tokens.length > 0) {
      // Prepare the notification message
      const message = {
        notification: {
          title: 'משחק חדש נוסף',
          body: `משחק חדש נגד ${req.body.rivalTeamName} בתאריך ${new Date(req.body.gameDate).toLocaleDateString('he-IL')}`,
          icon: '/logo.png',
          click_action: 'https://practi-web.onrender.com',
        },
        tokens: tokens, // Send to multiple tokens
      };

      // Send the notification to all players
      admin.messaging().sendMulticast(message)
        .then((response) => {
          console.log('Successfully sent notifications:', response);
        })
        .catch((error) => {
          console.warn('Failed to send notifications:', error);
        });
    }

    res.status(201).send(newGame);
  } catch (error) {
    console.error('Error creating game and sending notifications:', error);
    res.status(500).send(error);
  }
};


/**
 * Fetches a game based on the date and team names provided in the request parameters.
 * If the game is found, it returns the game data.
 * If the game is not found, it returns a 404 status with a 'Game not found' message.
 * If there is an error during the process, it logs the error and returns a 500 status.
 */
exports.getGameByDateAndTeam = async (req, res) => {
  try {
    const { gameDate, teamName, rivalTeamName } = req.params;
    const game = await gameService.getGameByDateAndTeam(gameDate, teamName, rivalTeamName);
    if (!game) {
      return res.status(404).send('Game not found');
    }
    res.send(game);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

/**
 * Retrieves all games for a specific team based on the team name provided in the request parameters.
 * If successful, it returns the list of games.
 * If there is an error during the process, it returns a 500 status with the error.
 */
exports.getAllGamesForTeam = async (req, res) => {
  try {
    const games = await gameService.getAllGamesForTeam(req.params.teamName);
    res.send(games);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Retrieves all games for a specific player and team based on the parameters provided in the request.
 * If successful, it returns the list of games.
 * If there is an error during the process, it returns a 500 status with the error.
 */
exports.getAllGamesForPlayer = async (req, res) => {
  try {
    const { playerName, teamName } = req.params;
    const games = await gameService.getAllGamesForPlayer(playerName, teamName);
    res.send(games);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Retrieves all games for a coach based on the coach's token.
 * The function decodes the token to get the coach's username, fetches all teams associated with that username,
 * and then gathers all games for those teams. The games are sorted by date, and the result is returned.
 * If no teams or games are found, or if there is an error, appropriate status codes and messages are returned.
 */
exports.getAllGamesForCoach = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;

  try {
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const username = decoded.username;

    // Fetch all teams for this coach
    const teams = await teamService.getTeamsByCoachUsername(username);
    if (!teams || teams.length === 0) {
      return res.status(404).send('No teams found for this coach.');
    }

    let allGames = [];

    // Sequentially fetch games for each team and collect them
    for (const team of teams) {
      const games = await gameService.getAllGamesForTeam(team.teamName);
      allGames = allGames.concat(games);
    }

    // Sort games by date from latest to earliest
    allGames.sort((a, b) => new Date(b.gameDate).getTime() - new Date(a.gameDate).getTime());
    res.send(allGames);
  } catch (error) {
    console.error("Failed in getAllGamesForCoach:", error);
    res.status(500).send(error);
  }
};

/**
 * Retrieves all games for a GM (General Manager) based on the club name provided in the request query.
 * The function fetches all teams associated with the club and then gathers all games for those teams.
 * The games are sorted by date and the result is returned. If no teams or games are found, or if there is an error, appropriate status codes and messages are returned.
 */
exports.getAllGamesForGm = async (req, res) => {
  try {
    const { clubName } = req.query;

    // Fetch all teams for this club
    const teams = await teamService.getTeamsByClubName(clubName);
    if (!teams || teams.length === 0) {
      return res.status(404).send('No teams found for this coach.');
    }

    let allGames = [];

    // Sequentially fetch games for each team and collect them
    for (const team of teams) {
      const games = await gameService.getAllGamesForTeam(team.teamName);
      allGames = allGames.concat(games);
    }

    // Sort games by date from latest to earliest
    allGames.sort((a, b) => new Date(b.gameDate).getTime() - new Date(a.gameDate).getTime());

    res.send(allGames);
  } catch (error) {
    console.error("Failed in getAllGamesForCoach:", error);
    res.status(500).send(error);
  }
};

/**
 * Retrieves the last game for a coach based on the coach's token.
 * The function decodes the token to get the coach's username, fetches all teams associated with that username,
 * and then gathers all games for those teams. The most recent game is returned.
 * If no teams or games are found, or if there is an error, appropriate status codes and messages are returned.
 */
exports.getLastGameForCoach = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;

  try {
    // Verify and decode the token to obtain the coach's username
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const username = decoded.username;

    // Fetch all teams associated with the coach's username
    const teams = await teamService.getTeamsByCoachUsername(username);
    if (!teams || teams.length === 0) {
      return res.status(404).send('No teams found for this coach.');
    }

    let allGames = [];

    // Fetch games for each team associated with the coach
    for (const team of teams) {
      const games = await gameService.getAllGamesForTeam(team.teamName);
      allGames = allGames.concat(games);
    }

    // Sort all games by date in descending order
    allGames.sort((a, b) => new Date(b.gameDate) - new Date(a.gameDate));

    // Return only the last game (most recent) or respond with 404 if none are found
    if (allGames.length > 0) {
      res.send(allGames[0]);
    } else {
      res.status(404).send('No games found.');
    }
  } catch (error) {
    console.error('Error in getLastGameForCoach:', error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * Deletes a game based on the date and team names provided in the request parameters.
 * If the game is successfully deleted, a 200 status with a success message is returned.
 * If the game is not found, a 404 status is returned. In case of any error, a 500 status is returned.
 */
exports.deleteGameByDateAndTeams = async (req, res) => {
  try {
    const { gameDate, teamName, rivalTeamName } = req.params;

    // Call the service layer to delete the game based on the parameters
    const deletedGame = await gameService.deleteGameByDateAndTeams(gameDate, teamName, rivalTeamName);

    if (deletedGame) {
      res.status(200).send({ message: 'Game deleted successfully.' });
    } else {
      res.status(404).send({ message: 'Game not found.' });
    }
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).send({ message: 'Internal Server Error', details: error });
  }
};

/**
 * Retrieves the total number of wins and losses for a specific team based on the team name provided in the request parameters.
 * If successful, the result is returned. In case of an error, a 500 status is returned.
 */
exports.getTeamWinsAndLosses = async (req, res) => {
  try {
    const { teamName } = req.params;
    const result = await gameService.calculateTeamWinsAndLosses(teamName);
    res.send(result);
  } catch (error) {
    console.error("Error in getTeamWinsAndLosses:", error);
    res.status(500).send({ message: 'Internal Server Error', details: error });
  }
};
