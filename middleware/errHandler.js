const errHandler = (err, req, res, next) => {
    let code = 500;
    let message = "Internal Server Error";

    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        code = 400
        message = err.errors[0].message
    } else if (err.name === "invalid_token") {
        code = 401
        message = "Invalid token"
    } else if (err.name === "invalid_email/pass") {
        code = 401
        message = "Invalid Email or Password"
    } else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        code = 401
        message = "Invalid token"
    } else if (err.name === "Unauthorized") {
        code = 401
        message = "Unauthorized"
    } else if (err.name === "watchlist_not_found") {
        code = 404
        message = "Watchlist not found"
    } else if (err.name === "forbidden") {
        code = 403
        message = "Forbidden"
    } else if (err.name === "not_verified") {
        code = 403
        message = "Unverified"
    } else if (err.name === "duplicate_watchlist") {
        code = 401
        message = "Duplicate watchlist"
    } else if (err.name === "no_found") {
        code = 404
        message = "Data not found"
    }

    res.status(code).json({ message });
};

module.exports = {
    errHandler,
};
