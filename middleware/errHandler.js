function errorHandler(err, req, res, next) {
    const errorMapping = {
      JsonWebTokenError: {
        code: 401,
        message: "Unauthorized",
      },
      Unauthorized: {
        code: 401,
        message: "Unauthorized",
      },
      "Not Found": {
        code: 404,
        message: "Error Not Found",
      },
      "SequelizeError": {
        code: 400,
        message: err.message,
      },
      Forbidden: {
        code: 403,
        message: "Forbidden",
      },
      "Invalid email or password": {
        code: 401,
        message: "Invalid email or password",
      },
      "Email or password is required": {
        code:401,
        message:"Email or password is required"
      },
      "e-mail already registered": {
        code:401,
        message:"e-mail already registered"
      },
    };
    let obj = {
      code: 500,
      message: "Internal Server Error",
    };
  
    if (err.name != null) obj = errorMapping[err.name];
  
    res.status(obj.code).json(obj);
  }
  
  module.exports = errorHandler;
  