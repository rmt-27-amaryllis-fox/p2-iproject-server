const router = require('express').Router()
const CoinController = require('../Controller/coin-controller')

router.get('/coins', CoinController.getAllCoin)
router.get('/coin/:uuid', CoinController.findCoin)
router.get('/rupiah', CoinController.IDRcurs)

module.exports = router