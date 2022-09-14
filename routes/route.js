const routes = require('express').Router()
const CardController = require('../controllers/card-controller')
const UserController = require('../controllers/user-controller')
const authentification = require('../middlewares/authentification')
const usersRoute = require('./user-route')

routes.get("/", (req, res) => {
  res.status(200).json({ message: `Hello Masuk ke server` })
})
routes.use('/users', usersRoute)

routes.use(authentification)
routes.get('/myprofile', UserController.showUserProfile)
routes.get('/game-cards', CardController.fetchingCards)
routes.post('/game-cards', CardController.addCardAfterGameMethod)
routes.post('/redeem', CardController.addRedeemCardMethod)

module.exports = routes