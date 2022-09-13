const express = require("express");
const app = express();
const port = 3000;
const Controller = require("./controller/controller");
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//sesuatu
app.post("/register", Controller.register);
app.post("/login", Controller.login);
app.post("/webHook", Controller.webHook);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
