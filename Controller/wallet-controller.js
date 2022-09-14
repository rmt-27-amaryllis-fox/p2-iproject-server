const { default: axios } = require('axios')
const {Wallet} = require('../models')

class WalletController{
    static async addToWallet(req, res, next){
        try {
            let UserId = req.user.id
            let uuid = req.params.uuid
            let {quantity} = req.query
            let {data} = await axios({
                method : 'GET',
                url : `https://api.coinranking.com/v2/coin/${uuid}`,
                headers : {
                    'x-access-token': process.env.API_KEY
                }
            })

            let addAsset = await Wallet.create({
                UserId : UserId,
                uuid : data.data.coin.uuid,
                name : data.data.coin.name,
                iconUrl : data.data.coin.iconUrl,
                price : Math.floor(data.data.coin.price),
                quantity : quantity
            })

            res.status(201).json({
                message : 'Successfully added asset to wallet !',
                addAsset
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getMyWallet(req, res, next){
        try {
            let UserId = req.user.id
            let findMyWallet = await Wallet.findAll({
                where : {UserId}
            })

            res.status(200).json(findMyWallet)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = WalletController