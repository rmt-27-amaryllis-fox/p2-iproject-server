const router = require('express').Router();
const TickerController = require('../controllers/ticker.controllers');

router.get('/', TickerController.show);

module.exports = router;