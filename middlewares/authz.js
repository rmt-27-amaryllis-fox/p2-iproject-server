const { MyJob } = require("../models");

const authz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const myjob = await MyJob.findByPk(id);

    if (!myjob) {
      throw { name: "NotFound" };
    }

    if (req.user.role === "Admin" && myjob.UserId !== req.user.id) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authz;
