const { setRandomFallback } = require("bcryptjs");

const SANBOX_BASE_URL = "https://api.sandbox.midtrans.com"
const PRODUCTION_BASE_URL = "https://api.midtrans.com/"

class Config {
    static serverKey = "SB-Mid-server-R2XsIJ-Dy-FlTGCFUl9mh0ks";
    static isProduction = false;
    static is3ds = false;
    static isSanitized = false;

    static getBaseUrl(){
        return Config.isProduction ? PRODUCTION_BASE_URL : SANBOX_BASE_URL
    }
}

module.exports = Config;