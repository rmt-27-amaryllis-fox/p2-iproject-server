const { Watchlist } = require('../models');

const authz = async (req, res, next) => {
    try {
        const { id } = req.params
        const findWatchlist = await Watchlist.findByPk(id)
        if (!findWatchlist) throw { name: "watchlist_not_found" }
        if (req.user.id !== findWatchlist.UserId) throw { name: "forbidden" }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authz
};
