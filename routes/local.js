const express = require('express')
const LocalClass = require('../controllers/localController')
const route = express.Router()

route.get('/weapons', LocalClass.getWeapon)

module.exports = route