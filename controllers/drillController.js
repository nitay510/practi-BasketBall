const drillService = require('../services/drillService');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

/**
 * Adds a new drill based on the provided data.
 * This function extracts data from the request body and token, determines if it's a single or double drill,
 * and then calls the drillService to add the drill.
 * If the drill is successfully added, it returns a 200 status with the drill data; otherwise, it returns a 401 error.
 */
exports.addDrill = async (req, res) => {
  try {
    const { missionName, tries, successes, drillName, topic, opponentName, opponentScore, target } = req.body;
    const { drillId } = req.params;
    const token = req.headers.authorization.split(' ')[1];

    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;

    // Decode the token to extract the user's username
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const user = decoded.username;

    let isSingle = true; // Default to single drill
    if (tries === undefined) {
      isSingle = false; // If 'tries' is not provided, it's a double drill
    }

    // Add the drill using the drill service
    const addDrill = await drillService.addDrill(drillId, user, missionName, tries, successes, drillName, topic, isSingle, opponentName, opponentScore, target);
    if (addDrill) {
      res.status(200).json(addDrill);
    } else {
      res.status(401).json({ error: 'Cannot add drill' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets the last drill for the authenticated user.
 * This function extracts the username from the token and retrieves the user's last drill using the drill service.
 * If a drill is found, it returns the drill name and topic; otherwise, it returns a 404 status with an error message.
 */
exports.getLastDrills = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const currentUser = decoded.username;

    // Get the last drill for the current user
    const drill = await drillService.getUserLastDrill(currentUser);
    if (drill) {
      const { drillName, topic } = drill;
      res.json({ drillName, topic });
    } else {
      res.status(404).json({ error: 'No drills found for the user' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets all single drills for the authenticated user.
 * This function retrieves the user's username from the token, fetches all single drills in the specified category,
 * and returns the drills.
 */
exports.getAllDrillsSingle = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const currentUser = decoded.username;
    const { category } = req.params;

    // Fetch all single drills for the user in the specified category
    const drills = await drillService.getAllDrillsSingle(currentUser, category);
    res.send(drills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets all double drills for the authenticated user.
 * This function retrieves the user's username from the token, fetches all double drills for the user,
 * and returns the drills.
 */
exports.getAllDrillsDouble = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const currentUser = decoded.username;

    // Fetch all double drills for the user
    const drills = await drillService.getAllDrillsDouble(currentUser);
    res.send(drills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets all single drills for a player, fetched by the coach.
 * This function takes the player (currentUser) from the request body and the category from the request params,
 * and fetches all single drills for that player in the specified category.
 */
exports.getAllDrillsSingleByCoach = async (req, res) => {
  try {
    const { currentUser } = req.body;
    const { category } = req.params;

    // Fetch all single drills for the player, as requested by the coach
    const drills = await drillService.getAllDrillsSingle(currentUser, category);
    console.log(drills);
    res.send(drills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets the high score for a specific drill and mission.
 * This function retrieves the user's username from the token and fetches the high score for the specified drill and mission.
 * The high score is returned as a JSON response.
 */
exports.getHighScore = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const currentUser = decoded.username;
    const { drillName } = req.query;
    const { missionName } = req.params;

    // Fetch the high score for the specified drill and mission
    const highScore = await drillService.getHighScore(currentUser, missionName, drillName);
    res.json(highScore);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets the total number of unique drills for the authenticated user.
 * This function retrieves the user's username from the token and fetches the count of unique drills the user has completed.
 */
exports.getHowManyDrills = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const currentUser = decoded.username;

    // Fetch the total number of unique drills for the user
    const drills = await drillService.getHowManyDrills(currentUser);
    res.json(drills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets the number of wins against a specific opponent for the authenticated user.
 * This function retrieves the user's username from the token and fetches the win/lose record against a specific opponent.
 */
exports.getWinLose = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const currentUser = decoded.username;
    const { opponentName } = req.params;

    // Fetch the win/lose record against a specific opponent
    const drills = await drillService.getWinLose(currentUser, opponentName);
    res.json(drills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Checks if a user has done a specific drill.
 * This function checks whether the authenticated user has completed a specific drill, as indicated by the drill name.
 */
exports.checkUserDrill = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const currentUser = decoded.username;
    const { drillName } = req.query;

    // Check if the user has completed the specified drill
    const hasDoneDrill = await drillService.hasUserDoneDrill(currentUser, drillName);
    res.json({ hasDoneDrill });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets the total number of drills performed by the user in the last month.
 * This function calculates the start and end dates of the previous month and fetches drills performed during that time.
 */
exports.getDrillsLastMonth = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const currentUser = decoded.username;

    // Get the total number of drills for the last month
    const drillsCount = await drillService.getDrillsLastMonth(currentUser);
    res.json({ drillsCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};