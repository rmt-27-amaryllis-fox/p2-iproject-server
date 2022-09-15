const { Painting, User, Favourite, Owned } = require('../models')
const axios = require("axios")
const { DefaultTransporter } = require('google-auth-library')
const midtransClient = require('midtrans-client')
const owned = require('../models/owned')

class PaintingController {

    static async getPainting (req, res, next) {
       try {
        const paintings = []
        const {data} = await axios({
            method: "GET",
            url: "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isHighlight=true&q=vincent van gogh"
        })

        paintings.push(data.objectIDs)

        let images = []

        for(let i=0; i<5; i++){
            let image = ``
            let id = paintings[0][i]

            image = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            images.push(image)
        }

        let imgUrls = []

        for(let i = 0; i<images.length;i++){

            const {data} = await axios({
                method: "GET",
                url: images[i],

            })
            
            let painting = {
                title: data.title,
                artist: data.artistDisplayName,
                image: data.primaryImageSmall,
                created: data.objectEndDate,
                UserId: 1
            } 
            imgUrls.push(painting)
        }
        res.status(200).json(imgUrls)


       } catch (error) {
        next(error)
        console.log(error);
       }
    }

    static async addOwned(req,res,next){
        const { id } = req.user;
        try {
            console.log(req.params.id, "IKI params");

            const data = await axios({
                method:"GET",
                url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${req.params.id}`
            })
         
            const owned = await Owned.create({
                price: (new Date().getFullYear()  - data.data.objectEndDate) * 10000,
                purchaseDate: `${new Date()}`,
                title: data.data.title,
                artist: data.data.artistDisplayName,
                imgUrl: data.data.primaryImageSmall,
                UserId: id
            })
            
            res.status(201).json(owned)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getOwned(req,res,next){
        try {
            console.log("MASUK CONTROLLER");
            const UserId = req.user.id
            const owneds = await Owned.findAll({
                where: {
                    UserId: UserId
                },
                include: [
                    {model: User}
                ]
            });

            console.log(owneds, "OWNEDS");
            if (!owneds) {
                console.log("MASUK FAVOURITE NULL");
                throw ({ name: "NoFavourites" })
            } else {

                res.status(200).json(owneds)
            }

        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    static async addFavourite(req, res, next){
        try {
            const UserId = req.user.id
            console.log(UserId, "<<<IKI USER ID");
            const { PaintingId } = req.params.id
            console.log(req.params.id, "<< IKI PAINTING ID");
            const {email} = await User.findOne({
                where: {
                    id: UserId
                }
            })

            // console.log(email);
            // const favourite = await Favourite.create({
            //     PaintingId: req.params.id,
            //     UserId
            // })

            const details = await axios({
                method: "GET",
                url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${req.params.id}`
            })

            let price = (new Date().getFullYear()  - details.data.objectEndDate) * 10000

            // let object = {
            //     id: req.params.id,
            //     name: details.data.title,
            //     quantity: 1,
            //     price: price
            // }
            // console.log(details.data.objectEndDate, price);
            console.log(email, "CEK EMAIL");
            let parameter = {
                transaction_details: {
                  order_id: `${new Date().valueOf()}`,
                  gross_amount: price,
                },
                credit_card: {
                  secure: true,
                },
                item_details: {
                    id: req.params.id,
                    name: details.data.title.substring(0,10),
                    quantity: 1,
                    price: price
                },
                customer_details: {
                  email,
                },
              };
              let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_KEY,
              });
              const transaction = await snap.createTransaction(parameter);
              let transactionToken = transaction.token;
              console.log(transactionToken);
              res.status(200).json({ trans_token: transactionToken });


            // res.status(200).json(details)

            // const product = await Product.findOne({
            //     where: { ProductId }
            // })

            // if (!product) {
            //     throw ({ name: "ProductIdNotFound" })
            // }
            // res.status(201).json({ message: "success add favourite", favourite })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async payment(req, res, next) {
        const { id } = req.user;
        try {
          const favourites = await Favourite.findAll({
            where: {
              UserId: id,
            }
          });
    
          let total = 0;
          let details = [];
          favourites.forEach((el) => {
            details.push({
              id: el.id,
              price: el.Cake.price,
              quantity: el.amount,
              name: el.Cake.name,
            });
          });
    
          let parameter = {
            transaction_details: {
              order_id: `${new Date().valueOf()}`,
              gross_amount: total,
            },
            credit_card: {
              secure: true,
            },
            item_details: details,
            customer_details: {
              email,
            },
          };
          let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_KEY,
          });
          const transaction = await snap.createTransaction(parameter);
          let transactionToken = transaction.token;
          res.status(200).json({ trans_token: transactionToken });
        } catch (error) {
          next(error);
        }
      }
}

module.exports = PaintingController