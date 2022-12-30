const WalletController = require('../Controller/wallet-controller')

const router = require('express').Router()

router.get('/wallet', WalletController.getMyWallet)
router.post('/wallet/:uuid', WalletController.addToWallet)

module.exports = router