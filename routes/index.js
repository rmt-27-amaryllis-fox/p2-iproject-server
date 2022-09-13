const routes = require('express').Router()
// const Controller = require('../controller/index')
// const auth = require('../middleware/auth')
// const authz = require('../middleware/authz')
const userRoutes = require('./users')


routes.use('/', userRoutes)



module.exports = routes