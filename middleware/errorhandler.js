function errorHandler(err,req,res,next) {
    switch(err.name) {
        case('SequelizeValidationError'):
        res.status(400).json({message: err.errors[0].message})
        break;

        case('SequelizeUniqueConstraintError'):
        res.status(400).json({message: err.errors[0].message})
        break;
        
        case("JsonWebTokenError"):
        res.status(401).json({message: "Invalid token"})
        break;

        case("Unauthorized"):
        res.status(401).json({message: "login first!"})
        break;

        case('invalid email/password'):
        res.status(404).json({message: 'invalid email/password'})
        break;

        case('Forbidden'):
        res.status(403).json({message: 'Forbidden'})
        break;

        case('NotFound'):
        res.status(404).json({message: `Data not found`})
        break;
        
        default:
        res.status(500).json({message: 'Internal server error'})
        break;
    }
}

module.exports = errorHandler