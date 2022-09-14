const {Package} = require('../models');

class PremiumPackageController {
  static async index(req, res, next) {
    try{
      const packages = await Package.findAll();
      res.status(200).json(packages);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = PremiumPackageController;