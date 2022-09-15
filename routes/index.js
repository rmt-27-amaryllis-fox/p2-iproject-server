const { application } = require('express')
const router = require('express').Router()
const Controller = require('../controllers/Controller.js')

router.post('/weathers', Controller.getBulkWeather)
router.post('/forecasts', Controller.getBulkForecast)

router.get('/', (req,res)=>{
    res.send('Server is running')
})

module.exports = router