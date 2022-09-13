const errorHandler = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal server error";

  if (err.name === "Email is required") {
    code = 400;
    message = err.name;
  } else if (err.name === "Password is required") {
    code = 400;
    message = err.name;
  } else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "Invalid email/password") {
    code = 400;
    message = err.name;
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
