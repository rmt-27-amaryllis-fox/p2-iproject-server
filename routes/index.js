const ControllerData = require("../Controller/controllers");

const router = require("express").Router();

router.get("/tweets", ControllerData.getTweet);
router.get("/photos", ControllerData.getPhotos);
module.exports = router;
