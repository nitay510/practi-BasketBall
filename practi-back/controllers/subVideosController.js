const subVideoService = require('../services/subVideoService');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


exports.getSubVideos = async (req, res) => {
    try {
        const { category } = req.params
      const token = req.headers.authorization.split(' ')[1];
      const parsedToken = JSON.parse(token);
      const tokenValue = parsedToken.token;
      const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
      const videos = await subVideoService.getSubVideos(category);
      res.send(videos);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };