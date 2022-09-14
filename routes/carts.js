const routes = require('express').Router()
const cartController = require('../controller/cart')

routes.get('/mycart', cartController.getCart)

routes.post('/cart/:medicineId', cartController.addToCart)


module.exports = routes