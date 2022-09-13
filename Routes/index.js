const router = require('express').Router()
const userRouter = require('./userRouter')
const coinRouter = require('./coinRouter')

router.use('/user', userRouter)
router.use('/coin', coinRouter)


module.exports = router