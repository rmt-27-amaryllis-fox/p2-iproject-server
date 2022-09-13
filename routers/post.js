const router = require("express").Router();
const PostController = require("../controllers/post");

router.post("/", PostController.add);
router.get("/", PostController.posts);

module.exports = router;
