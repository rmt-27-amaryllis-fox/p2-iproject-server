if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errHandler");
const app = express();
const port = process.env.PORT || 3000;

//routes

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use routes


app.use(errorHandler);


app.listen(port, () => {
    console.log(`masuk ${port}`);
  });
  
  module.exports = app;