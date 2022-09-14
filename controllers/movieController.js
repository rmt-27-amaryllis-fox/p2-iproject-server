require("dotenv").config();
const axios = require("axios");
const baseUrl = "https://api.themoviedb.org/3";
const midtransClient = require("midtrans-client");

class Controller {
  static async movies(req, res, next) {
    try {
      let { page = 1 } = req.query;
      const { data } = await axios({
        method: "get",
        url: baseUrl + "/movie/popular",
        params: {
          api_key: process.env.TMDB_API_KEY,
          page,
        },
      });
      res.status(200).json(data)
      console.log(data);
    } catch (error) {
      next(error);
    }
  }

  static async movieById(req, res, next) {
    try {
      const {id} = req.params
      const {data} = await axios({
        method: "get",
        url: baseUrl + `/movie/${id}`,
        params: {
          api_key: process.env.TMDB_API_KEY
        }
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async payment(req,res,next){
    try {
      const {id, email} = req.user

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
    
      let parameter = {
        transaction_details: {
          order_id: Date.now(),
          gross_amount: 50000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email,
        },
      };
     
      const transaction = await snap.createTransaction(parameter);
      let trans_token = transaction.token;
      
      res.status(200).json({trans_token})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;
