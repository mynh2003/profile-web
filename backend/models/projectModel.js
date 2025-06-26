const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    thumb: String,
    title: String,
    description: String,
    technologies: {
        languages: [String],
        frameworks: [String]
    },
    links: {
        github: String,
        demo: String,
    }
},{timestamps: true})

module.exports = mongoose.model('Project', projectSchema)