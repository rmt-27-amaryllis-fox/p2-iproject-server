const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'SequelizeValidationError':
      res.status(400).json({message: err.errors[0].message});
      break;
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({message: err.errors[0].message});
      break;
    case 'CustomValidationError':
      res.status(400).json({message: err.message});
      break;
    default:
      res.status(500).json({message: 'Internal Server Error'});
  }
}

module.exports = errorHandler;