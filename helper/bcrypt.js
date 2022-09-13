const bcryptjs = require("bcryptjs");

function validatePass(pass, has) {
  return bcryptjs.compareSync(pass, has);
}

module.exports = validatePass;
