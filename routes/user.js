const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/Users', userController.createUser)
router.get('/Users/:username', userController.getUser)
router.post('/Tokens', userController.authenticateUser)
router.post('/Users/updateFcmToken', userController.updateFcmToken);
module.exports = router