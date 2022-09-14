const router = require('express').Router();
const newsRoutes = require('./news.routes');
const authRoutes = require('./auth.routes');
const tickerRoutes = require('./ticker.routes');
const calculatorRoutes = require('./calculator.routes');
const paymentRoutes = require('./payment.routes');
const premiumPackagesRoutes = require('./premium.package.routes');
const userRoutes = require('./user.routes');
const watchlistRoutes = require('./watchlist.routes');
const errorHandler = require('../middleware/erorr.handler');

router.use(authRoutes);
router.use('/news', newsRoutes);
router.use('/tickers', tickerRoutes);
router.use('/calculators', calculatorRoutes);
router.use('/payment', paymentRoutes);
router.use('/packages', premiumPackagesRoutes);
router.use('/users', userRoutes);
router.use('/watchlists', watchlistRoutes);

router.use(errorHandler);

module.exports = router;