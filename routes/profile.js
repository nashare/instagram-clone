const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');

router.get('/', profileController.home);
router.get('/edit', profileController.edit);
router.put('/edit', profileController.update);
router.get('/saved', profileController.saved);


module.exports = router;