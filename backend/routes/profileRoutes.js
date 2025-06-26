const express = require('express')
const router = express.Router()
const profileController = require("../controllers/profileController")

router.get('/profile', profileController.getAllProfiles)
router.get('/profile/tab/:name', profileController.getTabByName)

module.exports = router