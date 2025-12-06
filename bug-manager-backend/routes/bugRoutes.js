const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bugController');
const protect = require('../middleware/authMiddleware');

router.use(protect);

router.post('/addBug', bugController.addBug);

router.get('/proiect/:id_proiect', bugController.getBugsByProject);

router.put('/:id_bug/status', bugController.updateBugStatus);


module.exports = router;