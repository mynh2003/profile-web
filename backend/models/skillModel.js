const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
      name: String,
      thumb: String,
      list: [String],
},{timestamps: true})

module.exports = mongoose.model('Skill', skillSchema)