if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const freeToGameRoutes = require("./routes/free-to-game-api");
const gamePricesRoutes = require("./routes/game-prices-api");

//routes

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use routes
app.use(freeToGameRoutes);
app.use(gamePricesRoutes);

app.listen(port, () => {
  console.log(`masuk ${port}`);
});

module.exports = app;
