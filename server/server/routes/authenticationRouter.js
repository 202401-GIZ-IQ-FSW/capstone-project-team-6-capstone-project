const express = require('express');
const router = express.Router();

const authenticationController = require("../controllers/authenticationController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Sign in
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rememberMe:
 *                 type: boolean
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully signed in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid credentials or already signed in
 *       403:
 *         description: User not authorized or account status prevents sign-in
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Sign up
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               role:
 *                 type: string
 *               ...rest:
 *                 type: object
 *             required:
 *               - name
 *               - username
 *               - email
 *               - password
 *               - confirmPassword
 *     responses:
 *       201:
 *         description: Successfully signed up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request body or user already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/session:
 *   get:
 *     summary: Get session details
 *     tags: [Authentication]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved session details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       403:
 *         description: User not signed in
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: Sign out
 *     tags: [Authentication]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Successfully signed out
 *       500:
 *         description: Internal server error
 */

// Handles sign in request coming from sign in page
router.post('/login', authenticationController.login);

// Handles sign up request coming from sign up page
router.post('/signup', authenticationController.signup);

// Handles session request
router.get('/session', ensureAuthenticated, authenticationController.getSession);

// Handles sign out request
router.get('/logout', ensureAuthenticated, authenticationController.logout);

module.exports = router;
