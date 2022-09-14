const routes = require("express").Router();
const GamePricesController = require("../controllers/game-prices-api");

routes.get("/prices", GamePricesController.searchGame);

module.exports = routes;