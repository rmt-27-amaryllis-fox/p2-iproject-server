if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const route = require("./routers/");
const errorHandler = require("./helpers/errorHandler");
// const authz = require("./middlewares/authz");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", route);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
