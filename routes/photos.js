const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photos');

router.get('/new', photosController.new);
router.post('/new', photosController.create);

module.exports = router;