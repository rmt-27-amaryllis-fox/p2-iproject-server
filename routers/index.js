const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const postRouter = require("./post");
const authc = require("../middlewares/authc");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello world!",
  });
});

router.use("/users", userRouter);
router.use(authc);
router.use("/posts", postRouter);

module.exports = router;
