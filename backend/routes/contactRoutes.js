const express = require('express')
const route = express.Router()
const contactController = require('../controllers/contactController')

route.get('/contact', contactController.getContact)

module.exports = route