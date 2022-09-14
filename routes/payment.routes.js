const PaymentController = require("../controllers/payment.controller");
const router = require('express').Router();
const authHandler = require('../middleware/auth.handler');

router.post('/notification', PaymentController.notification);
router.post('/:packageId',authHandler, PaymentController.payment);
module.exports = router;