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
    try {
      const teams = await Team.find({ players: username });
      // Check if there are any teams found
      if (!teams || teams.length === 0) {
        // Handle the case where no teams are found (e.g., return an empty array or a specific message)
        return []; // Or handle it in another way depending on your requirements
      }
      return teams;
    } catch (error) {
      // Handle any errors that occur during the database query
      console.error("Error fetching teams by player username:", error);
      throw error; // You can choose to throw the error or return an empty array
    }
  };
  
  exports.getTeamsByCoachUsername = async (username) => {
    try {
      const teams = await Team.find({ coach: username });
      // Check if there are any teams found
      if (!teams || teams.length === 0) {
        // Handle the case where no teams are found
        return []; // Or handle it in another way depending on your requirements
      }
      return teams;
    } catch (error) {
      // Handle any errors that occur during the database query
      console.error("Error fetching teams by coach username:", error);
      throw error; // You can choose to throw the error or return an empty array
    }
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