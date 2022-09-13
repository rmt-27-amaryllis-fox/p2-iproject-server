function errorHandler(err, req, res, next) {
  console.log(err);

  let errCode = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    errCode = 400;
    message = err.errors[0].message;
  } else if (err.name === "Username is required") {
    errCode = 400;
    message = "Username is required";
  } else if (err.name === "Email is required") {
    errCode = 400;
    message = "Email is required";
  } else if (err.name === "Password is required") {
    errCode = 400;
    message = "Password is required";
  } else if (err.name === "Email must be unique") {
    errCode = 400;
    message = "Email must be unique";
  } else if (err.name === "Username must be unique") {
    errCode = 400;
    message = "Username must be unique";
  }
  // } else if (err.name === "Invalid email/password") {
  //   errCode = 401;
  //   message = "Invalid email/password";
  // } else if (err.name === "Invalid token" || err.name === "JsonWebTokenError") {
  //   errCode = 401;
  //   message = "Invalid token";
  // } else if (err.name === "Course not found") {
  //   errCode = 404;
  //   message = "Course not found";
  // } else if (err.name === "You are not authorized") {
  //   errCode = 403;
  //   message = "You are not authorized";
  // }

  res.status(errCode).json({ message });
}

module.exports = errorHandler;
