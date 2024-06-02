const express = require('express')
const router = express.Router()
const drillController = require('../controllers/drillController')

router.post('/Drills/:drillId', drillController.addDrill)
 router.get('/Drills/:category', drillController.getAllDrillsSingle)
 router.post('/DrillsByCoach/:category', drillController.getAllDrillsSingleByCoach)
 router.get('/HowManyDrills/', drillController.getHowManyDrills)
 router.get('/DrillsDouble/', drillController.getAllDrillsDouble)
 router.get('/Drills/highScore/:missionName', drillController.getHighScore)
 router.get('/Drills/howManyWins/:opponentName', drillController.getWinLose)
 router.get('/LastDrill/', drillController.getLastDrills)
module.exports = router