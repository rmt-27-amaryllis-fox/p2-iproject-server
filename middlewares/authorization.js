const { Owned, Favourite } = require("../models")

const authorization = async (req, res, next) => {
    try {

    if (req.user.id == Owned.userId) {
        next()
    } else {
        throw ({ name: "Forbidden" })
    }
        
    } catch (error) {
        next(error)
    }
}
const ownedAuthorization = async (req, res, next) => {
    try {
            console.log(req.user.id, "PARAMS DOT ID");
            const owneds = await Owned.findAll({
                where: {
                    UserId: req.user.id
                }
                
            });

            if (owneds === []) {
                console.log("MASUK FAVOURITE NULL");
                throw ({ name: "NoFavourites" })
            } else if (owneds !== null) {
                console.log("MASUK FAVOURITE ADA");
                next()
            } else {
                throw ({ name: "Forbidden" })
            }
        }   catch (error) {
            console.log(error);
            next(error)
            }
        }

module.exports = {
    authorization,
    ownedAuthorization
}