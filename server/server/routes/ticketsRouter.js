const express = require('express')
const router = express.Router()
const ticketsController = require('../controllers/ticketsController')

router.route('/')
        .get(ticketsController.getTickets)
        .post(ticketsController.createTicket)

router.route('/:id')
        .get(ticketsController.getTicket)
        .delete(ticketsController.deleteTicket)
        .put(ticketsController.updateTicket)

router.route('/status-priority-assigned/:id')
        .put(ticketsController.updateStatusPriorityAssignedTo)        

module.exports = router