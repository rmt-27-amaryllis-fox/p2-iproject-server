const router = require("express").Router();
const UserController = require("../controllers/user");
const authc = require("../middlewares/authc");
const { userAuthz } = require("../middlewares/authz");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.use(authc);
router.put("/editprofile", userAuthz, UserController.edit);

module.exports = router;
