const express = require('express')
const router = express.Router()
const sendDrillController = require('../controllers/sendDrillController')
router.post('/SendDrills/:drillId', sendDrillController.addDrill);
router.delete('/SendDrills/:drillId', sendDrillController.deleteDrill);
router.get('/SendDrills/user', sendDrillController.getDrillsByUser);
router.get('/SendDrills/coach', sendDrillController.getDrillsByCoach);

module.exports = router