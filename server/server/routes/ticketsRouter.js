const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');
const commentsController = require('../controllers/commentsController');

// Middleware to attach ticketId to the request object
router.use('/:id', (req, res, next) => {
        req.ticketId = req.params.id;
        next();
});

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: API endpoints for managing tickets
 */

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Retrieve all tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: A list of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: No tickets found
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: Created ticket object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Missing ticket data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *     responses:
 *       200:
 *         description: Ticket object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       403:
 *         description: Not authorized to view the ticket
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       200:
 *         description: Updated ticket object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Invalid ticket data provided
 *       403:
 *         description: Not authorized to update the ticket
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *       403:
 *         description: Not authorized to delete the ticket
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tickets/status-priority-assigned/{id}:
 *   put:
 *     summary: Update status, priority, or assignee of a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       200:
 *         description: Updated ticket object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Invalid update data provided
 *       403:
 *         description: Not authorized to update the ticket
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tickets/search:
 *   get:
 *     summary: Search tickets
 *     tags: [Tickets]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search by ticket title
 *       - in: query
 *         name: userFullName
 *         schema:
 *           type: string
 *         description: Search by user full name
 *       - in: query
 *         name: assignedUserName
 *         schema:
 *           type: string
 *         description: Search by assigned user name
 *     responses:
 *       200:
 *         description: A list of matching tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Missing search criteria
 *       404:
 *         description: No matching tickets found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tickets/sort:
 *   get:
 *     summary: Sort tickets
 *     tags: [Tickets]
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort order (asc or desc)
 *     responses:
 *       200:
 *         description: A sorted list of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: No tickets found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments on tickets
 */

/**
 * @swagger
 * /tickets/{id}/comments:
 *   get:
 *     summary: Retrieve comments for a ticket
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       403:
 *         description: Not authorized to view the comments
 *       404:
 *         description: Comments not found
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new comment for a ticket
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Created comment object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Missing comment data
 *       403:
 *         description: Not authorized to create the comment
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tickets/{ticketId}/comments/{commentId}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       403:
 *         description: Not authorized to view the comment
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Updated comment object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid comment data provided
 *       403:
 *         description: Not authorized to update the comment
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       403:
 *         description: Not authorized to delete the comment
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */

router.route('/')
        .get(ticketsController.getTickets)
        .post(ticketsController.createTicket);

router.route('/search')
        .get(ticketsController.searchTickets);

router.route('/sort')
        .get(ticketsController.sortTickets);

router.route('/:id')
        .get(ticketsController.getTicket)
        .put(ticketsController.updateTicket)
        .delete(ticketsController.deleteTicket);

router.route('/status-priority-assigned/:id')
        .put(ticketsController.updateStatusPriorityAssignedTo);

router.route('/:id/comments')
        .get(commentsController.getComments)
        .post(commentsController.createComment);

router.route('/:id/comments/:id')
        .get(commentsController.getComment)
        .put(commentsController.updateComment)
        .delete(commentsController.deleteComment);

module.exports = router