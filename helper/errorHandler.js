function errorHandler(err, req, res, next){
    // console.log(err);
    let obj = {
        code: 500,
        response: {
            message: 'Internal Server Error'
        }
    }
    switch (err.name) {
        case 'SequelizeValidationError':
            obj.code = 400
            // let showErr = err.errors.map((el)=>{
            //     let error= el.message
            //     return error
            // }).join(", ")
            obj.response.message = err.errors[0].message
            // obj.response.message = showErr
            break;
        case 'Unautorized':
            obj.code = 401
            obj.response.message = "Please Login First"
            break;
        case 'JsonWebTokenError':
            obj.code = 401
            obj.response.message = "invalid Token"
            break;
        case 'Not Found':
            obj.code = 404
            obj.response.message = "Data Not Found"
            break;
        case 'Forbiden':
            obj.code = 403
            obj.response.message = "Forbiden"
            break;
        case 'Invalid email/password':
            obj.code = 401
            obj.response.message = "invalid email or password"
            break;
        case 'SequelizeValidationError':
            obj.code = 404
            let errors = []
            err.errors.forEach(el=>{
                errors.push(el.message)
            })
            obj.response.message = errors
            break;
        case 'SequelizeUniqueConstraintError':
            obj.code = 400
            obj.response.message = err.errors[0].message
            break;
        case 'Minimum Character Password':
            obj.code = 400
            obj.response.message = 'Min 5 Characters'
            break;
        case 'SequelizeForeignKeyConstraintError':
            obj.code = 404
            obj.response.message = 'Data Not Found'
            break;
        case 'not a Customer':
            obj.code = 401
            obj.response.message = 'Please use Customer Account'
            break;
        
    }

    res.status(obj.code).json(obj.response)
}

module.exports = errorHandler