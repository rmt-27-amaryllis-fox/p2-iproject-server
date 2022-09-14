const routes = require("express").Router();
const userController = require("../controller/user");

routes.post("/register", userController.register);

// routes.post('/google-sign-in', userController.googleLogin)

routes.post("/login", userController.login);

module.exports = routes;
