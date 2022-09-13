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
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not support"), false);
      return;
    }
    cb(null, true);
  },

  //   const upload = multer({ storage: storage });
});
