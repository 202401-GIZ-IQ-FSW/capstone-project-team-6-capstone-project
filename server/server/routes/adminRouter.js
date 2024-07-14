const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.route('/view-users')
        .get(adminController.getUsers);

router.route('/view-user/:id')
        .get(adminController.getUser)
        .delete(adminController.deleteUser);

// router.route('/new-admin')
//         .put(adminController.createAdmin);

// router.route('/new-support-agent')
//         .put(adminController.createSupportAgent);

router.route('/update-user-role/:id')
        .put(adminController.updateUserRole);

router.route('/update-user-status/:id')
        .put(adminController.updateUserStatus);

module.exports = router