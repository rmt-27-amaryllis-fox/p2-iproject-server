const route = require("express").Router();
const Controller = require("../controller/Controller");
const authc = require("../middleware/authc");

route.post("/register", Controller.register);
route.post("/login", Controller.login);
route.use(authc);
route.post("/services", Controller.services);
route.patch("/services/:id", Controller.updateStatus);

module.exports = route;
