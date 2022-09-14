const routes = require('express').Router()
const CardController = require('../controllers/card-controller')
const authentification = require('../middlewares/authentification')
const usersRoute = require('./user-route')

routes.get("/", (req, res) => {
  res.status(200).json({ message: `Hello Masuk ke server` })
})
routes.use('/users', usersRoute)

routes.use(authentification)

routes.get('/cards', CardController.fetchingCards)
routes.post('/cards', CardController.addCardToDbFromProfile)

module.exports = routes