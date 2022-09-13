const bcrypt = require("bcryptjs");

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8));

const comparePassword = (password, hashPassword) =>
  bcrypt.compareSync(password, hashPassword);

module.exports = {
  comparePassword,
  hashPassword,
};
