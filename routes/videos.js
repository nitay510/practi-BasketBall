const express = require('express')
const router = express.Router()
const videoController = require('../controllers/videoController')
router.get('/videos/:category', videoController.getVideos)
router.get('/nextVideoCategory/:category', videoController.getNextVideoInCategory)
router.get('/nextCategory/:category', videoController.getNextCategory)
router.get('/videoByName/:videoName',videoController.getVideoByName)
module.exports = router