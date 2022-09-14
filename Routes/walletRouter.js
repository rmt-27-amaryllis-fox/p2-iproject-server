const WalletController = require('../Controller/wallet-controller')

const router = require('express').Router()

router.post('/wallet/:uuid', WalletController.addToWallet)
router.get('/wallet', WalletController.getMyWallet)

module.exports = router