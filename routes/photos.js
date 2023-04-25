const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photos');

router.get('/new', photosController.new);
router.post('/new', photosController.create);
router.post('/:id/comments', photosController.comments);

router.post('/:photoId/comments/:commentId/edit', photosController.updateComment);
router.delete('/:photoId/comments/:commentId/delete', photosController.deleteComment);
router.put('/:id/like', photosController.like);
router.put('/:id/unlike', photosController.unlike);
router.delete('/:id/delete', photosController.delete);
router.put('/:id/save', photosController.save);
router.put('/:id/unsave', photosController.unsave);
router.get('/:id', photosController.show);


module.exports = router;