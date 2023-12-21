const express = require('express')
const router = express.Router()
const subVideoController = require('../controllers/subVideosController')
router.get('/subVideos/:category', subVideoController.getSubVideos)
module.exports = router