const routes = require('express').Router()
// const Controller = require('../controller/index')
const auth = require('../middleware/auth')
// const authz = require('../middleware/authz')
const userRoutes = require('./users')
const medicineRoutes = require('./medicines')
const cartRoutes = require('./carts')
const addressRoutes = require('./address')


routes.use('/', userRoutes)

routes.use('/', medicineRoutes)

routes.use(auth)


routes.use('/', addressRoutes)

routes.use('/', cartRoutes)



module.exports = routes