const drillService = require('../services/drillService');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

/**
 * Adds a new drill based on the provided data.
 */
exports.addDrill = async (req, res) => {
  try {
    const { missionName, tries, successes, drillName, topic, opponentName, opponentScore, target } = req.body;
    const { drillId } = req.params;
    const token = req.headers.authorization.split(' ')[1];

    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;

    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');

    const user = decoded.username;

    let isSingle = true; // Default to single
    if (tries === undefined) {
      isSingle = false; // If tries are not provided, it's a double drill
    }

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
 */
exports.getLastDrills = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const currentUser = decoded.username;
    const drill = await drillService.getUserLastDrill(currentUser);
    if (drill) {
      const { drillName, topic } = drill;
      res.json({ drillName, topic });
    } else {
      // Return a 404 status code and an error message indicating no drills were found
      res.status(404).json({ error: 'No drills found for the user' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets all single drills for the authenticated user.
 */
exports.getAllDrillsSingle = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const currentUser = decoded.username;
    const {category } = req.params;
    const drills = await drillService.getAllDrillsSingle(currentUser,category);
    res.send(drills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets all double drills for the authenticated user.
 */
exports.getAllDrillsDouble = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const currentUser = decoded.username;
    const drills = await drillService.getAllDrillsDouble(currentUser);
    res.send(drills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllDrillsSingleByCoach = async (req, res) => {
  try {
    const {currentUser} = req.body;
    console.log(currentUser);
    const {category } = req.params;
    const drills = await drillService.getAllDrillsSingle(currentUser,category);
    console.log(drills);
    res.send(drills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
/**
 * Gets the high score for a specific drill and mission.
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
    const highScore = await drillService.getHighScore(currentUser, missionName, drillName);
    res.json(highScore);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets the total number of unique drills for the authenticated user.
 */
exports.getHowManyDrills = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const currentUser = decoded.username;
    const drills = await drillService.getHowManyDrills(currentUser);
    res.json(drills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets the number of wins against a specific opponent for the authenticated user.
 */
exports.getWinLose = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const currentUser = decoded.username;
    const { opponentName } = req.params;
    const drills = await drillService.getWinLose(currentUser, opponentName);
    res.json(drills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
