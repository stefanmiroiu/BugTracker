const express = require('express');
const router = express.Router();
const proiectController = require('../controllers/proiectController');
const protect = require('../middleware/authMiddleware');

router.use(protect);

router.get('/echipe', projectController.getAllTeamsWithProjects);

router.get('/echipa', projectController.getMyTeamProjects);

router.post('/', projectController.addProject);


module.exports = router;