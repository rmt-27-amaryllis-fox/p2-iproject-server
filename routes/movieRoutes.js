const router = require('express').Router()
const Controller = require('../controllers/movieController')

router.get('/movies', Controller.movies)

module.exports = router