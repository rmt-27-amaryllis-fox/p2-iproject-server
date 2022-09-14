const WalletController = require('../Controller/wallet-controller')

const router = require('express').Router()

router.post('/wallet/:uuid', WalletController.addToWallet)

module.exports = router