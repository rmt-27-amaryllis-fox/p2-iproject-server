const routes = require("express").Router()
const userRoutes = require('./userRoutes')

routes.use(userRoutes)

module.exports = routes