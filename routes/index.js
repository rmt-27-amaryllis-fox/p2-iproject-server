const ControllerData = require("../Controller/controllers");

const router = require("express").Router();

router.get("/tweets", ControllerData.getTweet);

module.exports = router;
