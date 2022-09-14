const multer = require("multer");
const path = require("path");

// multer config
module.exports = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./assets");
    },
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    console.log(cb, "<<< ccb");
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(null, false, new Error("File type is not support"));
    }
    cb(null, true);
  },

  //   const upload = multer({ storage: storage });
});
