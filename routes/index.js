const {Controller} = require('../controllers/controller')

const router = require('express').Router()

router.post("/register", Controller.register)


module.exports = router