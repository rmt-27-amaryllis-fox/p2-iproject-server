function errorHandler(err, req, res, next) {
  console.log(err);
  let obj = { code: 500, response: { message: `ISE` } };
  if (
    err.name == `SequelizeValidationError` ||
    err.name == `SequelizeUniqueConstraintError`
  ) {
    obj.code = 400;
    obj.response.message = err.errors[0].message;
  } else if (err.name == `invalid email/password`) {
    obj.code = 400;
    obj.response.message = `invalid email/password`;
  } else if (err.name == `please register first`) {
    obj.code = 401;
    obj.response.message = `Unauthorized`;
  } else if (err.name == `unauthorized`) {
    obj.code = 401;
    obj.response.message = `Unauthorized`;
  } else if (err.name == `not found from authz`) {
    obj.code = 401;
    obj.response.message = `data not found from authz`;
  } else if (err.name == `don't have authorization`) {
    obj.code = 401;
    obj.response.message = `don't have authorization`;
  }
  res.status(obj.code).json(obj.response);
}

module.exports = errorHandler;
