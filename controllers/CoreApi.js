const ApiRequestor = require('./ApiRequestor');
const Config = require('./ConfigController');

class CoreApi {
    static charge(payloads){
        let result = ApiRequestor.post(
            ConfigController.getBaseUrl() + "/charge",
            ConfigController.serverKey,
            payloads
        );
    }
}
