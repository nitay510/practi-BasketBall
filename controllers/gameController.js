// controllers/gameController.js
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const gameService = require('../services/gameService');
const teamService = require('../services/teamsService');
exports.createGame = async (req, res) => {
  try {
    const newGame = await gameService.createGame(req.body);
    res.status(201).send(newGame);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getGameByDateAndTeam = async (req, res) => {
  try {
    const { gameDate, teamName,rivalTeamName } = req.params;
    const game = await gameService.getGameByDateAndTeam(gameDate, teamName,rivalTeamName);
    if (!game) {
      return res.status(404).send('Game not found');
    }
    res.send(game);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getAllGamesForTeam = async (req, res) => {
  try {
    const games = await gameService.getAllGamesForTeam(req.params.teamName);
    res.send(games);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllGamesForPlayer = async (req, res) => {
    try {
      const { playerName, teamName } = req.params;
      const games = await gameService.getAllGamesForPlayer(playerName, teamName);
      res.send(games);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  exports.getAllGamesForCoach = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;

    try {
        const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
        const username = decoded.username;

        // Fetch all teams for this coach
        const teams = await teamService.getTeamsByCoachUsername(username);
        console.log(teams);
        if (!teams || teams.length === 0) {
            return res.status(404).send('No teams found for this coach.');
        }

        let allGames = [];

        // Sequentially fetch games for each team and collect them
        for (const team of teams) {
                const games = await gameService.getAllGamesForTeam(team.teamName);
                allGames = allGames.concat(games);
        }

        // Sort games by date
        allGames.sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate));
        console.log(allGames);
        res.send(allGames);
    } catch (error) {
        console.error("Failed in getAllGamesForCoach:", error);
        res.status(500).send(error);
    }
};

exports.getAllGamesForGm = async (req, res) => {
  try {
  const { clubName } = req.query;
      // Fetch all teams for this coach
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

      // Sort games by date
      allGames.sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate));

      res.send(allGames);
  } catch (error) {
      console.error("Failed in getAllGamesForCoach:", error);
      res.status(500).send(error);
  }
};


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