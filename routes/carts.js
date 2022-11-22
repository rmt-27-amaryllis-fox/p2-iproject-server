const routes = require("express").Router();
const cartController = require("../controller/cart");

routes.get("/mycart", cartController.getCart);

routes.post("/cart/:medicineId", cartController.addToCart);

routes.post("/cartshipping", cartController.shippingFee);

routes.post("/checkout", cartController.checkOut);

routes.delete("/mycart/:id", cartController.deleteItem);

module.exports = routes;
