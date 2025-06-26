const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: String,
    link: String,
    logo: String,
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Contact', contactSchema)