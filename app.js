if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const port = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const app = express();

const routers = require("./routes");
const { errHandler } = require("./middleware/errHandler");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routers);
app.use(errHandler);

app.listen(port, () => console.log("app listening on...", port));
