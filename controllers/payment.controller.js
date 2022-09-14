const midtransClient = require('midtrans-client');
const {Package, Transaction, User} = require('../models');

class PaymentController {
  static async payment(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY
      });

      const {packageId: PackageId} = req.params;
      const {id: UserId, name, email} = req.user;
      const transactionCode = +new Date();
      const premiumPackage = await Package.findByPk(PackageId);
      if (!premiumPackage) throw {name: 'CustomValidationError', message: 'Package not found'};

      let parameter = {
        "transaction_details": {
          "order_id": transactionCode,
          "gross_amount": premiumPackage.price
        },
        "credit_card": {
          "secure": true
        },
        "customer_details": {
          "first_name": name,
          "email": email
        }
      };

      const {token: transactionToken} = await snap.createTransaction(parameter)
      await Transaction.create({transactionCode, UserId, PackageId});
        res.status(200).json({transactionToken})
    } catch (e) {
      next(e);
    }
  }

  static async notification(req, res, next) {
    try {
      const midtransClient = require('midtrans-client');
      let apiClient = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY
      });

      const notificationJson = req.body;

      const statusResponse = await apiClient.transaction.notification(notificationJson)
      let orderId = statusResponse.order_id;
      let transactionStatus = statusResponse.transaction_status;
      let fraudStatus = statusResponse.fraud_status;
      const transaction = await Transaction.findOne({where: {transactionCode: orderId}});
      console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);
      switch (transactionStatus) {
        case 'capture':
          if (fraudStatus == 'challenge') {
            // TODO set transaction status on your database to 'challenge'
            // and response with 200 OK
          } else if (fraudStatus == 'accept') {
            // TODO set transaction status on your database to 'success'
            // and response with 200 OK
          }
          break;
        case 'settlement':
          await Transaction.update({status:2},{where: {transactionCode : orderId}});
          await User.update({premium:1}, {where: {id: transaction.UserId}});
          break;
        case 'cancel':
          break;
        case 'deny':
          break;
        case 'expire':
          break;
        case 'pending':
          await Transaction.update({status: 1}, {where: {transactionCode: orderId}});
          break;
      }

    } catch (e) {
      next(e);
    }
  }
}

module.exports = PaymentController;