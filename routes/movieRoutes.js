const router = require('express').Router()
const Controller = require('../controllers/movieController')
const authentication = require('../middlewares/authentication')

router.get('/movies', Controller.movies)
router.get('/movies/:id', Controller.movieById)

router.use(authentication)

router.get('/payment', Controller.payment)

module.exports = router