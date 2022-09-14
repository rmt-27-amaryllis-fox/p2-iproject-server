const router = require('express').Router()
const userRouter = require('./userRouter')
const coinRouter = require('./coinRouter')
const walletRouter = require('./walletRouter')
const authentication = require('../middlewares/authentication')

router.use('/user', userRouter)
router.use('/coin', coinRouter)

router.use(authentication)

router.use(walletRouter)


module.exports = router