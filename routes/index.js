const ControllerData = require("../Controller/controllers");

const router = require("express").Router();

router.get("/tweets", ControllerData.getTweet);
router.get("/photos", ControllerData.getPhotos);
router.post("/emails", ControllerData.sendEmail);
module.exports = router;
