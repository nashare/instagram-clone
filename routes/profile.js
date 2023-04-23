const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');

router.get('/', profileController.home);
router.get('/saved', profileController.saved);

module.exports = router;