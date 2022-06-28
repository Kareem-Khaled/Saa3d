const express = require('express');

const router = express.Router();
const chats = require('../controllers/chats');
const { isLoggedIn } = require('../middleware');

router.post('/', isLoggedIn, chats.findChat);
router.get('/:chatId', isLoggedIn, chats.renderChat);

module.exports = router;