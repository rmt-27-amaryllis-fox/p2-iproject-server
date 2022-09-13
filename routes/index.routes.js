const router = require('express').Router();
const newsRoutes = require('./news.routes');

router.use('/news', newsRoutes);

module.exports = router;