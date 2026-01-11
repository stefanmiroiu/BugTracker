const express = require('express');
const router = express.Router();
const proiectController = require('../controllers/proiectController');
const protect = require('../middleware/authMiddleware');

router.use(protect);

router.get('/echipe', proiectController.getAllTeamsWithProjects);

router.get('/echipa', proiectController.getMyTeamProjects);

router.post('/', proiectController.addProject);

router.post('/join', proiectController.joinProject);

module.exports = router;