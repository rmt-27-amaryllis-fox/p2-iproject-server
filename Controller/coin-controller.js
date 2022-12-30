const axios = require('axios')

class CoinController{
    static async getAllCoin(req, res, next){
        try {
            let limit = 12;
            let {page} = req.query
            let {data} = await axios({
                method : 'GET',
                url : 'https://api.coinranking.com/v2/coins',
                headers : {
                    'x-access-token': process.env.API_KEY
                },
                params : {
                    limit,
                    offset : page * limit - limit
                }
            })

            res.status(200).json(data.data.coins)
        } catch (error) {
            next(error)
        }
    }

    static async findCoin(req, res, next){
        try {
            let uuid = req.params.uuid
            let {data} = await axios({
                method : 'GET',
                url : `https://api.coinranking.com/v2/coin/${uuid}`,
                headers : {
                    'x-access-token': process.env.API_KEY
                }
            })

            if(!data){
                throw {name : 'not_found'}
            }

            res.status(200).json(data.data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async IDRcurs(req, res, next){
        try {
            let conversion = await axios({
                method : 'GET',
                url : 'https://v6.exchangerate-api.com/v6/pair/USD/IDR',
                headers : {
                    Authorization : `Bearer ${process.env.EXCHANGE_API}` 
                }
            })

            res.status(200).json({curs : conversion.data.conversion_rate})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CoinController