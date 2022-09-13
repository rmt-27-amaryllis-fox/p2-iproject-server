function errorHandler(error, req, res, next) {
  // default error
  let erorrMessage = {
    code: 500,
    response: { message: "Internal Server Error" }
  };

  if (error.name === "SequelizeValidationError") {
    let errorList = error.errors.map(item => {
      return item.message
    })
    res.status(400).json({ message: errorList })
  }

  else if (error.name === "SequelizeUniqueConstraintError") {
    let errorList = error.errors.map(item => {
      return item.message
    })
    res.status(400).json({ message: errorList })
  }

  else if (error.name === `invalid email/password`) {
    res.status(401).json({ message: `error invalid username or email or password` })
  }

  else if (error.name === `Unauthorized Activity`) {
    res.status(401).json({ message: `Unauthorized Activity` })
  }

  else if (error.name === "JsonWebTokenError") {
    res.status(401).json({ message: `invalid token` })
  }

  else if (error.name === "TokenExpiredError") {
    res.status(401).json({ message: `expired token` })
  }

  else if (error.name === `forbidden to access`) {
    res.status(403).json({ message: `forbidden to access ` })
  }

  else if (error.name === `card not found`) {
    res.status(404).json({ message: `Card not found ` })
  }

  else if (error.name === `eror-fetching-card`) {
    res.status(404).json({ message: `eror : api ygopro macet ` })
  }



  else {
    res.status(erorrMessage.code).json(erorrMessage.response)
  }


}

module.exports = errorHandler