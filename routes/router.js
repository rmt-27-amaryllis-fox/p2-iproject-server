const express = require('express')
const user = require('./user')
const route = express.Router()

route.use(user)

module.exports = route