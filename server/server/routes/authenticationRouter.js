const express = require('express');
const router = express.Router();

const authenticationController = require("../controllers/authenticationController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

// Handles sign in request coming from sign in page
router.post('/login', authenticationController.login);

// Handles sign up request coming from sign up page
router.post('/signup', authenticationController.signup);

// Handles session request
router.get('/session', ensureAuthenticated, authenticationController.getSession);

// Handles sign out request
router.get('/logout', ensureAuthenticated, authenticationController.logout);

module.exports = router;
