const routes = require("express").Router();
const auth = require("../middleware/auth");
const cartController = require("../controllers/cart");

routes.get("/mycart", auth, cartController.getCart);
routes.post("/mycart", auth, cartController.addToCart);
routes.delete("/mycart", auth, cartController.deleteCart);

module.exports = routes;