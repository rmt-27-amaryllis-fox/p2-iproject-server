const routes = require("express").Router();
const auth = require("../middleware/auth");
const transController = require("../controllers/transaction");

routes.get("/transaction", auth, transController.getTransHistory);
routes.post("/transaction", auth, transController.createTransaction);

module.exports = routes;
