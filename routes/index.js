const routes = require("express").Router()
const userRoutes = require('./userRoutes')
const movieRoutes = require('./movieRoutes')

routes.use(userRoutes)
routes.use(movieRoutes)

module.exports = routes