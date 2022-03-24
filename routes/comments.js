const express = require('express');

// to get params from app.js file
const router = express.Router({mergeParams: true});

const { isLoggedIn } = require('../middleware');

const comments = require('../controllers/comments');

router.route('/').post(comments.addComment);

router.route('/:commentId').delete(comments.deleteComment);

module.exports = router;