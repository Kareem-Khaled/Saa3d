const express = require('express');

// require passport to make user register & login more easier
const passport = require('passport');

const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const { isLoggedIn } = require('../middleware');


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderRegister)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/profile', users.renderProfile);

router.get('/main',isLoggedIn, users.renderMain);

router.get('/logout', users.logout);


module.exports = router;