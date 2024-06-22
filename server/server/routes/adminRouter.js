const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.route('/view-users')
        .get(adminController.getUsers)

router.route('/view-user/:id')
        .get(adminController.getUser)
        .delete(adminController.deleteUser)

router.route('/new-admin')
        .put(adminController.createAdmin)

router.route('/new-support-agent')
        .put(adminController.createSupportAgent)

module.exports = router