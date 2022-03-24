const express = require('express');

const router = express.Router();
const { isLoggedIn } = require('../middleware');
const posts = require('../controllers/posts');

//isLoggedIn
router.route('/main')
        .get(posts.renderMain);

router.route('/post/:postId')
      .get(posts.showPost)
      .delete(posts.deletePost);

module.exports = router;