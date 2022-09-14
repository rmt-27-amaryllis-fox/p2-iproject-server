const { application } = require("express");
const { Controller } = require("../controllers/controller");
const { authc } = require("../middleware/authc");
const { authz } = require("../middleware/authz");

const router = require("express").Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/series", Controller.fetchSeries);
router.get("/movies", Controller.fetchMovie);
router.post("/search", Controller.search)
router.get("/movies/:id", Controller.getMovieDetail);
router.get("/series/:id", Controller.getSeriesDetail);
router.patch("/confirmation/:token", Controller.verification);
// ---- authc -----
router.use(authc);
// ---- autch -----
router.get("/watchlists", Controller.getWatchlists)
router.post("/watchlists/movies/:movieId", Controller.postWatchlistMovie);
router.post("/watchlists/series/:seriesId", Controller.postWatchlistSeries);
router.delete("/watchlists/:id", authz, Controller.deleteWatchlist);

module.exports = router;
