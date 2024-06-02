const sendDrillService = require('../services/sendDrillService');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

/**
 * Adds a new drill based on the provided data.
 */
exports.addDrill = async (req, res) => {
  try {
    const { drillName, topic, user } = req.body;
    const { drillId } = req.params;
    const token = req.headers.authorization.split(' ')[1];

    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;

    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');

    const coach = decoded.username;


    const addDrill = await sendDrillService.addDrill(drillId, user,coach,  drillName, topic);
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

// New deleteDrill function
exports.deleteDrill = async (req, res) => {
    try {
      const { drillId } = req.params;
      const success = await sendDrillService.deleteDrill(drillId);
      if (success) {
        res.status(200).json({ message: 'Drill deleted successfully' });
      } else {
        res.status(404).json({ error: 'Drill not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // New getDrillsByUser function
  exports.getDrillsByUser = async (req, res) => {
    try {
      const { username } = req.params;
      const drills = await sendDrillService.getDrillsByUser(username);
      res.status(200).json(drills);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // New getDrillsByCoach function
  exports.getDrillsByCoach = async (req, res) => {
    try {
      const { username } = req.params;
      const drills = await sendDrillService.getDrillsByCoach(username);
      res.status(200).json(drills);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };