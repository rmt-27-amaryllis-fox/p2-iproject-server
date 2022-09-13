if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
} //! pada masa development dan testing
const router = require("./routes");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;
const cloudinary = require("cloudinary");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

cloudinary.config({
  cloud_name: "dijlefaha",
  api_key: "877337812422573",
  api_secret: "6tOY0eRIq-BVqvJVn1SqcswcvYs",
});

cloudinary.v2.uploader.upload(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function (error, result) {
    console.log(result);
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
