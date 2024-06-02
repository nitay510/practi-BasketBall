// routes/gameRoutes.js

const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/games', gameController.createGame);
router.get('/games/date/:gameDate/team/:teamName/rivalTeam/:rivalTeamName', gameController.getGameByDateAndTeam);
router.get('/games/team/:teamName', gameController.getAllGamesForTeam);
router.get('/games/team/:teamName/player/:playerName', gameController.getAllGamesForPlayer);
router.get('/games/coach', gameController.getAllGamesForCoach);
router.get('/games/coachLastGame', gameController.getLastGameForCoach);
router.get('/games/club', gameController.getAllGamesForGm);
router.get('/games/team/:teamName/wins-losses', gameController.getTeamWinsAndLosses);
router.delete('/games/date/:gameDate/team/:teamName/rivalTeam/:rivalTeamName', gameController.deleteGameByDateAndTeams);
module.exports = router;
