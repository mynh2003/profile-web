const { collection } = require("../models/profileModel")

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const getFullUrl = (path) => {
    return path ? `${BASE_URL}${path}`: ''
}

module.exports = getFullUrl