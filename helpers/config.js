const {tmdbInstance} = require("./axiosInstance");

const imageHandler = (path) => {
    const { data } = tmdbInstance({
        url: "/configuration",
        method: "GET"
    })
    const result = data.images.secure_base_url + "original" + path
    return 
}

module.exports = {
    imageHandler
};
