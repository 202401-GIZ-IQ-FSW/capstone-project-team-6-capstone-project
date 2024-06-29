const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')

router.route('/')
        .get(profileController.getProfile)
        .put(profileController.updateProfile)
        .delete(profileController.deleteProfile)

module.exports = router