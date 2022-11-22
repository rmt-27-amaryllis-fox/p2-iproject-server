const routes = require('express').Router()
const addressController = require('../controller/address')

routes.get('/address', addressController.getAddress)

routes.post('/address', addressController.createAddress)


module.exports = routes