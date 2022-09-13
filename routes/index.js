const {application} = require('express')
const {Controller} = require('../controllers/controller')
const {authc} = require('../middleware/authc')

const router = require('express').Router()

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.get("/movies", Controller.fetchMovie)
router.get("/series", Controller.fetchSeries)
router.patch("/confirmation/:token", Controller.verification)
router.get("/movies/:id", Controller.getMovieDetail)
// authc
router.use(authc)
router.post("/watchlists/:movieId", Controller.postWatchlist)

module.exports = router