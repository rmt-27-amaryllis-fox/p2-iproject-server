const axios = require('axios')

class CoinController{
    static async getAllCoin(req, res, next){
        try {
            let limit = 10;
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
            res.status(200).json(data.data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = CoinController