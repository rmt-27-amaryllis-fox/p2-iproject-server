const router = require('express').Router();
const PremiumPackageController = require('../controllers/premium.package.controller.js');
router.get('/', PremiumPackageController.index);

module.exports = router;