const express = require('express');

const router = express.Router();
const { isLoggedIn } = require('../middleware');
const posts = require('../controllers/posts');

router.route('/main')
        .get(isLoggedIn, posts.renderMain);

router.route('/show/:id')
      .get(isLoggedIn, posts.showPost)
      .post(isLoggedIn, posts.addComment)

module.exports = router;