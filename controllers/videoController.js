const videoService = require('../services/videoService');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


exports.getVideos = async (req, res) => {
    try {
        const { category } = req.params
      const token = req.headers.authorization.split(' ')[1];
      const parsedToken = JSON.parse(token);
      const tokenValue = parsedToken.token;
      const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
      const videos = await videoService.getVideos(category);
      res.send(videos);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.getNextVideoInCategory = async (req, res) => {
    try {
      const { videoName } = req.query;
      const { category } = req.params;
  
      const token = req.headers.authorization.split(' ')[1];
      const parsedToken = JSON.parse(token);
      const tokenValue = parsedToken.token;
      const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
      const video = await videoService.getNextVideoInCategory(category, videoName);
      res.send(video);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  exports.getVideoByName = async (req, res) => {
    try {
      const { videoName } = req.params;
  
      const token = req.headers.authorization.split(' ')[1];
      const parsedToken = JSON.parse(token);
      const tokenValue = parsedToken.token;
      const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
      const video = await videoService.getVideoByName(videoName);
      res.send(video);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
    
exports.getNextCategory = async (req, res) => {
    try {
        const { category } = req.params
      const token = req.headers.authorization.split(' ')[1];
      const parsedToken = JSON.parse(token);
      const tokenValue = parsedToken.token;
      const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
      const nextCategory = await videoService.getNextCategory(category);
      res.json(nextCategory);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  