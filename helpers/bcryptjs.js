const {hashSync, compareSync} = require("bcryptjs");

const hashPass = (password) => hashSync(password, 8)
const comparePass = (plainPassword, hashedPassword) => compareSync(plainPassword, hashedPassword)

module.exports = {
    hashPass,
    comparePass
};
