const router = require("express").Router()
const Controller = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(authentication)

router.patch('/status', Controller.paid)

module.exports = router