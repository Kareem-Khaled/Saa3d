const express = require('express');

// to get params from app.js file
const router = express.Router({mergeParams: true});

const { isLoggedIn } = require('../middleware');

const requests = require('../controllers/requests');
const notifications = require('../controllers/notifications');

router.route('/:serviceId')
        .get(requests.jobFinished)
        .post(requests.postReview);

module.exports = router;