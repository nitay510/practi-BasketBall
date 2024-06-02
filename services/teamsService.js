// services/teamService.js

const Team = require('../models/team');  // Adjust the path as necessary
const User = require('../models/user');  // Ensure the path to User model is correct

exports.addNewTeam = async (teamName, coachUsername,club) => {
    const newTeam = new Team({
      teamName,
      club,
      coach: coachUsername,
      players: []  // Starts with an empty array of players
    });
    await newTeam.save();
    return newTeam;
  };
  
  exports.getTeamsByPlayerUsername = async (username) => {
    return await Team.find({ players: username });
  };

  exports.getTeamsByCoachUsername = async (username) => {
    return await Team.find({ coach: username });
  };
  
  exports.getTeamByName = async (teamName) => {
    return await Team.findOne({ teamName });
  };
  
  exports.getAllTeamNames = async () => {
    const teams = await Team.find({});
    return teams.map(team => team.teamName);
  };
  
  exports.addPlayerToTeam = async (username, teamName, club) => {
    return await Team.findOneAndUpdate(
      { teamName, club }, // Correctly using both parameters in the query
      { $addToSet: { players: username } }, // Adds the username only if not already present
      { new: true } // Returns the updated team after adding the player
    );
  };
exports.getPlayersDetailsByTeamName = async (teamName) => {
  const team = await Team.findOne({ teamName }).lean();
  if (!team) return null;

  const playerUsernames = team.players;
  const players = await User.find({ username: { $in: playerUsernames } }).select('fullName username');

  // Map usernames to full names
  const playerDetails = players.map(player => ({
    username: player.username,
    fullName: player.fullName
  }));

  return playerDetails;
};
// Remove a player from a team by a coach
exports.removePlayerFromTeamByCoach = async (username, teamName) => {
  return await Team.findOneAndUpdate(
    { teamName },
    { $pull: { players: username } },
    { new: true }
  );
};

// Remove a player from a team by the player themselves
exports.removePlayerFromTeamByPlayer = async (username, teamName) => {
  return await Team.findOneAndUpdate(
    { teamName, players: username },
    { $pull: { players: username } },
    { new: true }
  );
};

exports.getTeamsByClubName = async (clubName) => {
  return await Team.find({ club: clubName });
};