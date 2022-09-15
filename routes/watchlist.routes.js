const router = require('express').Router();
const WatchlistController = require('../controllers/watchlist.controller');
const authHandler = require('../middleware/auth.handler');

router.get('/', authHandler, WatchlistController.index);

module.exports = router;