const route = require("express").Router();
const Controller = require("../controller/Controller");
const authc = require("../middleware/authc");
const authz = require("../middleware/authz");

route.post("/register", Controller.register);
route.post("/login", Controller.login);
route.get("/services", Controller.queueList);
route.use(authc);
route.post("/services", Controller.services);
route.patch("/services/:id", authz, Controller.updateStatus);
route.get("/myHistory", Controller.myHistory);

module.exports = route;
