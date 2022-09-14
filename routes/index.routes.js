const router = require('express').Router();
const newsRoutes = require('./news.routes');
const authRoutes = require('./auth.routes');
const tickerRoutes = require('./ticker.routes');
const calculatorRoutes = require('./calculator.routes');
const errorHandler = require('../middleware/erorr.handler');

router.use(authRoutes);
router.use('/news', newsRoutes);
router.use('/tickers', tickerRoutes);
router.use('/calculators', calculatorRoutes);
router.use(errorHandler);

module.exports = router;