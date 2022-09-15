const midtransClient = require('midtrans-client');
// Create Snap API instance


// let snap = new midtransClient.Snap({
//         // Set to true if you want Production Environment (accept real transaction).
//         isProduction : false,
//         serverKey : 'SB-Mid-server-R2XsIJ-Dy-FlTGCFUl9mh0ks'
//     });
 
// let parameter = {
//     "transaction_details": {
//         // "order_id": "YOUR-ORDERID-123456",
//         "order_id": new Date(),
//         "gross_amount": 10000
//     },
//     "credit_card":{
//         "secure" : true
//     },
//     "customer_details": {
//         "first_name": "budi",
//         "last_name": "pratama",
//         "email": "budi.pra@example.com",
//         "phone": "08111222333"
//     }
// };

// snap.createTransaction(parameter)
//     .then((transaction)=>{
//         // transaction token
//         let transactionToken = transaction.token;
//         console.log('transactionToken:',transactionToken);
        
//     })

class MidTransController {
    static async getToken (req, res, next){
        try {
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : 'SB-Mid-server-R2XsIJ-Dy-FlTGCFUl9mh0ks'
            });
         
        let parameter = {
            "transaction_details": {
                // "order_id": "YOUR-ORDERID-123456",
                "order_id": new Date(),
                "gross_amount": 10000
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "first_name": "budi",
                "last_name": "pratama",
                "email": "budi.pra@example.com",
                "phone": "08111222333"
            }
        };
        
        snap.createTransaction(parameter)
            .then((transaction)=>{
                // transaction token
                let transactionToken = transaction.token;
                console.log('transactionToken:',transactionToken);
                console.log(transactionToken);
                res.status(200).json({
                    transactionToken,
                    redirectUrl: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${transactionToken}`
                })    
            })
            
        } catch (error) {
            console.log();
            next(error)
        }
    }
}

module.exports = MidTransController