const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');
const commentsController = require('../controllers/commentsController');

// Middleware to attach ticketId to the request object
router.use('/:id', (req, res, next) => {
        req.ticketId = req.params.id;
        next();
});

router.route('/')
        .get(ticketsController.getTickets)
        .post(ticketsController.createTicket);

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