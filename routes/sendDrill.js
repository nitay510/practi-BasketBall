const express = require('express')
const router = express.Router()
const sendDrillController = require('../controllers/sendDrillController')
router.post('/Drills/:drillId', sendDrillController.addDrill);
router.delete('/Drills/:drillId', sendDrillController.deleteDrill);
router.get('/Drills/user/:username', sendDrillController.getDrillsByUser);
router.get('/Drills/coach/:username', sendDrillController.getDrillsByCoach);

module.exports = router