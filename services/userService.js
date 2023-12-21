const Users = require('../models/user');

/**
 * Creates a new user in the database.
 * @param {Object} userData - User data including firstName, lastName, cityOfLiving, age, username, and password.
 * @returns {Promise<User>} - Returns the created User object.
 */
exports.createUser = async (userData) => {
  try {
    const { fullName, cityOfLiving, age, username } = userData;

    // Create a new User document
    const user = new Users({
      fullName, cityOfLiving, age, username
    });

    // Save the user document to the database
    await user.save();

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Gets a user from the database based on the provided username.
 * @param {string} username - Username of the user.
 * @returns {Promise<User|null>} - Returns the user object or null if not found.
 */
exports.getUserByUsername = async (username) => {
  try {
    // Assuming you have a User model defined with the required schema
    const user = await Users.findOne({ username });
    return user;
  } catch (error) {
    throw error;
  }
};
