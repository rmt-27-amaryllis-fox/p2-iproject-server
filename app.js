if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
} //! pada masa development dan testing
const router = require("./routes");
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cloudinary = require("cloudinary");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("assets"));

app.use(router);
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
