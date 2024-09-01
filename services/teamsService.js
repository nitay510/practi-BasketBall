const Team = require('../models/team');  // Importing the Team model
const User = require('../models/user');  // Importing the User model

/**
 * Creates a new team with the provided team name, coach username, and club.
 * Initializes the team with an empty array of players.
 * @param {string} teamName - The name of the team.
 * @param {string} coachUsername - The username of the coach.
 * @param {string} club - The club to which the team belongs.
 * @returns {Object} The newly created team document.
 */
exports.addNewTeam = async (teamName, coachUsername, club) => {
    const newTeam = new Team({
        teamName,
        club,
        coach: coachUsername,
        players: []  // Starts with an empty array of players
    });
    await newTeam.save();  // Save the new team to the database
    return newTeam;  // Return the newly created team
};
/**
 * Deletes a team based on its name and the coach's username.
 * Ensures that only the coach who created the team can delete it.
 * @param {string} teamName - The name of the team to be deleted.
 * @param {string} coachUsername - The username of the coach requesting deletion.
 * @returns {Object|null} The deleted team document, or null if the team was not found.
 */
exports.deleteTeamByCoach = async (teamName, coachUsername) => {
    return await Team.findOneAndDelete({ teamName, coach: coachUsername });
};
/**
 * Retrieves all teams that a player is part of, based on their username.
 * @param {string} username - The username of the player.
 * @returns {Array} An array of teams that the player is part of, or an empty array if none are found.
 */
exports.getTeamsByPlayerUsername = async (username) => {
    try {
        const teams = await Team.find({ players: username });
        if (!teams || teams.length === 0) {
            return []; // Return an empty array if no teams are found
        }
        return teams;  // Return the list of teams the player is part of
    } catch (error) {
        console.error("Error fetching teams by player username:", error);
        throw error;  // Throw the error to be handled by the calling function
    }
};

/**
 * Retrieves all teams coached by a specific coach, based on their username.
 * @param {string} username - The username of the coach.
 * @returns {Array} An array of teams coached by the coach, or an empty array if none are found.
 */
exports.getTeamsByCoachUsername = async (username) => {
    try {
        const teams = await Team.find({ coach: username });
        if (!teams || teams.length === 0) {
            return []; // Return an empty array if no teams are found
        }
        return teams;  // Return the list of teams coached by the coach
    } catch (error) {
        console.error("Error fetching teams by coach username:", error);
        throw error;  // Throw the error to be handled by the calling function
    }
};

/**
 * Retrieves a team based on its name.
 * @param {string} teamName - The name of the team.
 * @returns {Object|null} The team document, or null if the team is not found.
 */
exports.getTeamByName = async (teamName) => {
    return await Team.findOne({ teamName });  // Find and return the team by its name
};

/**
 * Retrieves the names of all teams.
 * @returns {Array} An array of all team names.
 */
exports.getAllTeamNames = async () => {
    const teams = await Team.find({});  // Retrieve all teams
    return teams.map(team => team.teamName);  // Return an array of team names
};

/**
 * Adds a player to a team, identified by team name and club.
 * If the player is already in the team, they will not be added again.
 * @param {string} username - The username of the player.
 * @param {string} teamName - The name of the team.
 * @param {string} club - The club to which the team belongs.
 * @returns {Object} The updated team document.
 */
exports.addPlayerToTeam = async (username, teamName, club) => {
    return await Team.findOneAndUpdate(
        { teamName, club },  // Find the team by name and club
        { $addToSet: { players: username } },  // Add the player to the team if not already present
        { new: true }  // Return the updated team after adding the player
    );
};

/**
 * Retrieves the details of all players in a specific team.
 * @param {string} teamName - The name of the team.
 * @returns {Array|null} An array of player details (username and full name), or null if the team is not found.
 */
exports.getPlayersDetailsByTeamName = async (teamName) => {
    const team = await Team.findOne({ teamName }).lean();  // Find the team by name
    if (!team) return null;  // Return null if the team is not found

    const playerUsernames = team.players;  // Get the list of player usernames in the team
    const players = await User.find({ username: { $in: playerUsernames } }).select('fullName username');  // Retrieve player details

    // Map usernames to full names
    const playerDetails = players.map(player => ({
        username: player.username,
        fullName: player.fullName
    }));

    return playerDetails;  // Return the list of player details
};

/**
 * Removes a player from a team by a coach.
 * @param {string} username - The username of the player to be removed.
 * @param {string} teamName - The name of the team from which the player is to be removed.
 * @returns {Object} The updated team document after the player is removed.
 */
exports.removePlayerFromTeamByCoach = async (username, teamName) => {
    return await Team.findOneAndUpdate(
        { teamName },  // Find the team by name
        { $pull: { players: username } },  // Remove the player from the team
        { new: true }  // Return the updated team after the player is removed
    );
};

/**
 * Removes a player from a team by the player themselves.
 * @param {string} username - The username of the player to be removed.
 * @param {string} teamName - The name of the team from which the player is to be removed.
 * @returns {Object} The updated team document after the player is removed.
 */
exports.removePlayerFromTeamByPlayer = async (username, teamName) => {
    return await Team.findOneAndUpdate(
        { teamName, players: username },  // Find the team by name and player
        { $pull: { players: username } },  // Remove the player from the team
        { new: true }  // Return the updated team after the player is removed
    );
};

/**
 * Retrieves all teams associated with a specific club.
 * @param {string} clubName - The name of the club.
 * @returns {Array} An array of teams belonging to the specified club.
 */
exports.getTeamsByClubName = async (clubName) => {
    return await Team.find({ club: clubName });  // Find and return all teams by club name
};
