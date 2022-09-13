const {Controller} = require('../controllers/controller')

const router = require('express').Router()

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.get("/movies", Controller.fetchMovie)
router.get("/series", Controller.fetchSeries)
router.patch("/confirmation/:token", Controller.verification)
router.get("/movies/:id", Controller.getMovieDetail)

module.exports = router