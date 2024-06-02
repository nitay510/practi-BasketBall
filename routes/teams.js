
const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teamsController');

router.post('/teams', teamsController.createTeam);
router.get('/teams', teamsController.getTeamsByCoach);
router.get('/teams/player', teamsController.getTeamsByPlayer);
router.post('/teams/players', teamsController.getPlayersByTeam);
router.get('/teams/names', teamsController.getAllTeams);
router.post('/teams/join', teamsController.joinTeam);
router.post('/teams/removePlayerByCoach', teamsController.removePlayerByCoach);
router.post('/teams/removePlayerByPlayer', teamsController.removePlayerByPlayer);
router.get('/teams/club', teamsController.getTeamsByClub);
module.exports = router;