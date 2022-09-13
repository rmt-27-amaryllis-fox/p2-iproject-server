const bcryptjs = require('bcryptjs')

function hashPassword(password){
    return bcryptjs.hashSync(password, 10)
}

function validatePassword(password, hashedPassword){
    return bcryptjs.compareSync(password, hashedPassword)
}

module.exports = {hashPassword, validatePassword}