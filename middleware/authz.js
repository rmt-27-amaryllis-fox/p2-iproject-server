const { Service } = require("../models");

const authz = async function authorization(req, res, next) {
  try {
    const data = await Service.findByPk(req.params.id);
    if (!data) {
      throw { name: `not found from authz` };
    } else if (req.user.role == `admin` || req.user.id == data.UserId) {
      next();
    } else {
      throw { name: `don't have authorization` };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authz;
