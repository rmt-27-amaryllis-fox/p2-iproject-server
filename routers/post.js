const router = require("express").Router();
const PostController = require("../controllers/post");

router.post("/", PostController.add);

module.exports = router;
