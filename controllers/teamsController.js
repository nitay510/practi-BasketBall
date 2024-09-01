// controllers/teamController.js
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const teamService = require('../services/teamsService');

/**
 * Creates a new team.
 * The team name and club are extracted from the request body, and the coach's username is retrieved from the JWT token.
 * The team is created using the team service.
 * If successful, a 201 status code and the newly created team are returned.
 * If an error occurs, a 500 status code is returned with the error details.
 */
exports.createTeam = async (req, res) => {
  const { teamName, club } = req.body;
  const token = req.headers.authorization.split(' ')[1];

  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;

  const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');

  const username = decoded.username;

  try {
    const newTeam = await teamService.addNewTeam(teamName, username, club);
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};


/**
 * Deletes a team by the coach who created it.
 * The team name is extracted from the request body, and the coach's username is retrieved from the JWT token.
 * If successful, a success message and the deleted team are returned.
 * If the team is not found or the coach is not authorized, an appropriate error message is returned.
 * If an error occurs, a 500 status code is returned with the error details.
 */
exports.deleteTeamByCoach = async (req, res) => {
  const { teamName } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;

  const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
  const username = decoded.username;

  try {
      const deletedTeam = await teamService.deleteTeamByCoach(teamName, username);
      if (!deletedTeam) {
          return res.status(404).json({ error: 'Team not found or you are not authorized to delete this team' });
      }
      res.json({ message: 'Team deleted successfully', team: deletedTeam });
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};
/**
 * Retrieves all teams for the authenticated player.
 * The player's username is extracted from the JWT token, and the teams are retrieved using the team service.
 * If successful, the teams are returned as a JSON response.
 * If an error occurs, a 500 status code is returned with the error details.
 */
exports.getTeamsByPlayer = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;
  const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
  const username = decoded.username;

  try {
    const teams = await teamService.getTeamsByPlayerUsername(username);
    res.json(teams);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

/**
 * Retrieves all teams for the authenticated coach.
 * The coach's username is extracted from the JWT token, and the teams are retrieved using the team service.
 * If successful, the teams are returned as a JSON response.
 * If an error occurs, a 500 status code is returned with the error details.
 */
exports.getTeamsByCoach = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;

  const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');

  const username = decoded.username;

  try {
    const teams = await teamService.getTeamsByCoachUsername(username);
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

/**
 * Retrieves all players for a specific team.
 * The team name is extracted from the request body, and the players are retrieved using the team service.
 * If successful, the players are returned as a JSON response.
 * If the team is not found, a 404 status code is returned.
 * If an error occurs, a 500 status code is returned with the error details.
 */
exports.getPlayersByTeam = async (req, res) => {
  const { teamName } = req.body;
  const token = req.headers.authorization.split(' ')[1];

  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;

  const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');

  const username = decoded.username;
  try {
    const team = await teamService.getTeamByName(teamName);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    const players = await teamService.getPlayersDetailsByTeamName(teamName);
    res.json({ players });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

/**
 * Retrieves all team names.
 * This endpoint returns a list of all team names.
 * If successful, the team names are returned as a JSON response.
 * If an error occurs, a 500 status code is returned with the error details.
 */
exports.getAllTeams = async (req, res) => {
  try {
    const teamNames = await teamService.getAllTeamNames();
    res.json({ teamNames });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

/**
 * Adds a player to a team.
 * The team name and club are extracted from the request body, and the player's username is retrieved from the JWT token.
 * The player is added to the team using the team service.
 * If successful, a success message and the updated team are returned.
 * If an error occurs, a 500 status code is returned with the error details.
 */
exports.joinTeam = async (req, res) => {
  const { teamName, club } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;

  const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');

  const username = decoded.username;
  try {
    const updatedTeam = await teamService.addPlayerToTeam(username, teamName, club);
    res.json({ message: 'Player added successfully', team: updatedTeam });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

/**
 * Removes a player from a team by the coach.
 * The player's username and the team name are extracted from the request body.
 * The player is removed from the team using the team service.
 * If successful, a success message and the updated team are returned.
 * If an error occurs, a 500 status code is returned with the error details.
 */
exports.removePlayerByCoach = async (req, res) => {
  const { username, teamName } = req.body;
  try {
    const updatedTeam = await teamService.removePlayerFromTeamByCoach(username, teamName);
    res.json({ message: 'Player removed successfully', team: updatedTeam });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

/**
 * Removes a player from a team by the player themselves.
 * The team name is extracted from the request body, and the player's username is retrieved from the JWT token.
 * The player is removed from the team using the team service.
 * If successful, a success message and the updated team are returned.
 * If an error occurs, a 500 status code is returned with the error details.
 */
exports.removePlayerByPlayer = async (req, res) => {
  const { teamName } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;
  const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
  const username = decoded.username;

  try {
    const updatedTeam = await teamService.removePlayerFromTeamByPlayer(username, teamName);
    res.json({ message: 'Player removed successfully', team: updatedTeam });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

/**
 * Retrieves all teams for a specific club.
 * The club name is extracted from the query parameters, and the teams are retrieved using the team service.
 * If no teams are found, a 404 status code is returned.
 * If successful, the teams are returned as a JSON response.
 * If an error occurs, a 500 status code is returned with the error details.
 */
exports.getTeamsByClub = async (req, res) => {
  const { clubName } = req.query; // Assuming club name is passed as a query parameter

  try {
    // Ensure the club name is provided
    if (!clubName) {
      return res.status(400).json({ error: 'Missing club name in the query' });
    }

    // Fetch teams by club name using the team service
    const teams = await teamService.getTeamsByClubName(clubName);
    // Return error if no team as benn found
    if (teams.length === 0) {
      return res.status(404).json({ error: 'No teams found for this club' });
    }
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams by club name:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};
