const express = require("express");
const router = express.Router();
const userRouter = require("./user");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello world!",
  });
});

router.use("/users", userRouter);

module.exports = router;
