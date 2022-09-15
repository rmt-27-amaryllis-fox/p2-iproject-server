const CoreApi = require('./CoreApi')
const BankTransfer = require('./BankTransfer')

class IndexController {
 static async bankTransfer(req, res, next){
    let data;
    let body = req.body;
    let customers = {
        email: "sample@gmail.com",
        first_name: "sample",
        last_name: "name",
        phone: "0813111",
    }

    let bankTransfer = new BankTransfer(body.items, customers)
    switch (body.channel) {
        case "BCA":
            data = bankTransfer.bca()
            break;
        case "BNI":
            data = bankTransfer.bni()
        break;
        case "Permata":
            data = bankTransfer.permata()
            break;
    }
    return data;
    return CoreApi.charge(data);
 }
}

module.exports = IndexController

//state loading => sperti v-if, waktu axios loading true, finally loading false