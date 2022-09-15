function errorHandler(err,req,res,next){
    let obj = {}
    if (err.name === 'Coordinate required!' || err.name === 'Coordinate needs to be an array!') {
        let errormsg = err.name
        obj.code = 400
        obj.response = { message : errormsg}
    } else {
        obj.code = 500
        obj.response = {message : 'Internal Server Error'}
    }

    console.log(err);

    res.status(obj.code).json(obj.response)
}

module.exports = errorHandler