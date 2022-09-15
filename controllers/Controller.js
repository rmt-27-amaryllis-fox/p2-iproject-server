const axios = require('axios')

class Controller {
    static async getBulkWeather(req,res,next){
        try {
            if(!req.body.coord) throw {name : 'Coordinate required!'}

            let {coord} = req.body

            if(!Array.isArray(coord)) throw { name : 'Coordinate needs to be an array!' }
            
            
            let endpoints = []

            endpoints = coord.map(el => {
                return `https://api.openweathermap.org/data/2.5/weather?lat=${el.lat}&lon=${el.lng}&appid=${process.env.OPENWEATHER_KEY}&units=metric`
            })

            let response = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)))

            let rtr = response.map(el => el.data)

            res.status(200).json(rtr)

            
        } catch (error) {
            next(error)
        }
    }

    static async getBulkForecast(req,res,next){
        try {
            if(!req.body.coord) throw {name : 'Coordinate required!'}

            let {coord} = req.body
            
            if(!Array.isArray(coord)) throw { name : 'Coordinate needs to be an array!' }
            
            let endpoints = []

            endpoints = coord.map(el => {
                return `https://api.openweathermap.org/data/2.5/forecast?lat=${el.lat}&lon=${el.lng}&appid=${process.env.OPENWEATHER_KEY}&cnt=16&units=metric`
            })

            let response = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)))

            let rtr = response.map(el => el.data)

            res.status(200).json(rtr)

        } catch (error) {
            next(error)
        }
    }
}

module.exports= Controller