if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();
// const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// app.listen(port, () => {
//   console.log("Listen to port:", port);
// });
module.exports = app;
