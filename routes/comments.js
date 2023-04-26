const express = require('express');
const router = express.Router({ mergeParams: true });
const commentsController = require('../controllers/comments');

router.post('/', commentsController.create);
router.get('/:commentId/edit', commentsController.edit);
router.put('/:commentId/edit', commentsController.update);
router.delete('/:commentId/delete', commentsController.delete);


module.exports = router;