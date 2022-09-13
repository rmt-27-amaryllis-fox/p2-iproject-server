const bcrypt = require('bcryptjs')

const hashing = (input)=>{
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(input, salt);

    let hashed = hash
    return hashed
}

const comparing = (input, hashed)=>{
    return bcrypt.compareSync(input, hashed)
}

module.exports = {
    hashing,
    comparing
}