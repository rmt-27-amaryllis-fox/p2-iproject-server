const routes = require('express').Router()
const usersRoute = require('./user-route')

routes.get("/", (req, res) => {
  res.status(200).json({ message: `Hello Masuk ke server` })
})
routes.use('/users', usersRoute)

module.exports = routes