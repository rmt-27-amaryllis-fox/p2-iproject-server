const router = require('express').Router();
const CalculatorController = require('../controllers/calculator.controller');

router.post('/lumpsum', CalculatorController.lumpSum);

module.exports = router;