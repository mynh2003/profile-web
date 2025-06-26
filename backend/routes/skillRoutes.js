const express = require('express')
const route = express.Router()
const skillController = require('../controllers/skillController')

route.get('/skill', skillController.getSkills)

module.exports = route