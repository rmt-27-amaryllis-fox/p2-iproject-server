const router = require("express").Router();
const PostController = require("../controllers/post");
const authz = require("../middlewares/authz");

router.post("/", PostController.add);
router.get("/", PostController.posts);
router.put("/:id", authz, PostController.edit);

module.exports = router;
