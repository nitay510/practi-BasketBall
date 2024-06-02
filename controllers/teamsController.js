// controllers/teamController.js
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const teamService = require('../services/teamsService');

exports.createTeam = async (req, res) => {
  const { teamName,club } = req.body;
  const token = req.headers.authorization.split(' ')[1];

  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;

  const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');

  const username = decoded.username;

  try {
    const newTeam = await teamService.addNewTeam(teamName, username,club);
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};
// controllers/teamController.js

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

exports.getAllTeams = async (req, res) => {
  try {
    const teamNames = await teamService.getAllTeamNames();
    res.json({ teamNames });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

exports.joinTeam = async (req, res) => {
  const { teamName,club } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;

  const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');

  const username = decoded.username;
  try {
    const updatedTeam = await teamService.addPlayerToTeam(username, teamName,club);
    res.json({ message: 'Player added successfully', team: updatedTeam });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};
// Remove player from a team by a coach
exports.removePlayerByCoach = async (req, res) => {
  const { username, teamName } = req.body;
  try {
    const updatedTeam = await teamService.removePlayerFromTeamByCoach(username, teamName);
    res.json({ message: 'Player removed successfully', team: updatedTeam });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

// Remove player from a team by the player themselves
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


exports.getTeamsByClub = async (req, res) => {
  const { clubName } = req.query; // Assuming club name is passed as a query parameter

  try {
    // Ensure the club name is provided
    if (!clubName) {
      return res.status(400).json({ error: 'Missing club name in the query' });
    }

    // Fetch teams by club name using the team service
    const teams = await teamService.getTeamsByClubName(clubName);

    // Return the result
    if (teams.length === 0) {
      return res.status(404).json({ error: 'No teams found for this club' });
    }

    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams by club name:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};