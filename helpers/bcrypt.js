const bcrypt = require("bcryptjs");

// Compare
const comparePasword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

module.exports = {
  comparePasword,
};
