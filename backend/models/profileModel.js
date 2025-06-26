const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  tab: Array,
},{timestamps: true});

module.exports = mongoose.model('profile', profileSchema);
