const routes = require("express").Router();
const FreeToGameController = require("../controllers/free-to-game-api");

routes.get("/games", FreeToGameController.gameList);
routes.get("/games-platform", FreeToGameController.gameByPlatform);
routes.get("/games-category", FreeToGameController.gameByCategory);
routes.get("/games-sort-by", FreeToGameController.sortBy);
routes.get("/games-sort-category-platform", FreeToGameController.sortAll);

module.exports = routes;
