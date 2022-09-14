const router = require('express').Router()
const Controller = require('../controllers/movieController')

router.get('/movies', Controller.movies)
router.get('/movies/:id', Controller.movieById)

module.exports = router