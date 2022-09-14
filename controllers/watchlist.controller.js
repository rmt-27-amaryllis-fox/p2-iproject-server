const {Watchlist} = require('../models');

class WatchlistController {
  static async index(req, res, next) {
    try {
      const watchlists = await Watchlist.findAll();
      res.status(200).json(watchlists);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = WatchlistController