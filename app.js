if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errHandler");
const app = express();
const port = process.env.PORT || 3000;

//routes
const freeToGameRoutes = require("./routes/free-to-game-api");
const gamePricesRoutes = require("./routes/game-prices-api");
const user = require("./routes/user")
const cart = require("./routes/cart")
const transaction = require("./routes/transaction")
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use routes
app.use(user)
app.use(freeToGameRoutes);
app.use(gamePricesRoutes);
app.use(cart);
app.use(transaction);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`masuk ${port}`);
});

module.exports = app;
