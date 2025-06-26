const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')

router.get('/project', projectController.getProject)

module.exports = router
