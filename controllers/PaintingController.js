const { Painting, User } = require('../models')
const { getPagination, getPaginationData } = require('../helpers/pagination')
const axios = require("axios")

class PaintingController {

    static async getPainting (req, res, next) {
       try {
        const paintings = []
        const {data} = await axios({
            method: "GET",
            url: "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isHighlight=true&q=vincent van gogh"
        })

        paintings.push(data.objectIDs)

        let images = []

        for(let i=0; i<5; i++){
            let image = ``
            let id = paintings[0][i]

            image = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            images.push(image)
        }

        let imgUrls = []

        for(let i = 0; i<images.length;i++){

            const {data} = await axios({
                method: "GET",
                url: images[i],

            })
            
            let painting = {
                title: data.title,
                artist: data.artistDisplayName,
                image: data.primaryImageSmall,
                created: data.objectEndDate,
                UserId: 1
            } 
            imgUrls.push(painting)
        }
        res.status(200).json(imgUrls)


       } catch (error) {
        next(error)
        console.log(error);
       }
    }
}

module.exports = PaintingController