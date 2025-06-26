const express = require('express')
const route = express.Router()
const testimonialController = require('../controllers/testimonialController')

route.get('/testimonial', testimonialController.getTestimonial)

module.exports = route