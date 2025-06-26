const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    email: String,
    role: String,
    message: String
},{timestamps: true})

module.exports = mongoose.model('Testimonial', testimonialSchema)