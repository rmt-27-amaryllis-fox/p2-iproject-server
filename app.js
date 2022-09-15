if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes/route");
const port = 3000;
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(route);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listen to ${port}`);
});
