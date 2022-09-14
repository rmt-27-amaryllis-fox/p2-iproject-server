const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const authHandler = require('../middleware/auth.handler');

router.get('/', authHandler, UserController.show);

module.exports = router;