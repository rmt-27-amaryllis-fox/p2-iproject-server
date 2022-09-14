const routes = require('express').Router()
const medicineController = require('../controller/medicine')

routes.get('/medicines', medicineController.getMedicine)

routes.get('/medicines/:id', medicineController.getMedicineById)


module.exports = routes