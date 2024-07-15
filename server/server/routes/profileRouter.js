const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [Male, Female, Prefer not to disclose]
 *         country:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         age:
 *           type: number
 *         role:
 *           type: string
 *           enum: [superAdmin, admin, supportAgent, customer]
 *         status:
 *           type: string
 *           enum: [Active, Pending, Blocked]
 *     Ticket:
 *       type: object
 *       properties:
 *         number:
 *           type: number
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         imageURL:
 *           type: string
 *         category:
 *           type: string
 *           enum: [General Inquiry, Technical, Bug Report]
 *         status:
 *           type: string
 *           enum: [Open, In Progress, Closed]
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High, Urgent, Critical]
 *         user:
 *           type: string
 *           format: uuid
 *         assignedUser:
 *           type: string
 *           format: uuid
 *     Comment:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         imageURL:
 *           type: string
 *         ticket:
 *           type: string
 *           format: uuid
 *         user:
 *           type: string
 *           format: uuid
 *     Allow:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         allowAll:
 *           type: string
 *           enum: [Yes, No]
 */

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete user profile
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Successfully deleted user profile and tickets
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.route('/')
        .get(profileController.getProfile)
        .put(profileController.updateProfile)
        .delete(profileController.deleteProfile);

module.exports = router