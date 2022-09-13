const {tmdbInstance} = require("./axiosInstance");

async function imageHandler() {
    try {
        const {data} = await tmdbInstance({
            url: "/configuration",
            method: "GET"
        })
        return data.images.secure_base_url + "original"
    } catch (err) {
        console.log(err);
    }
}
// data.images.secure_base_url + "original" + path

imageHandler() + '/apsjdioasbfasiodd.jpg'

module.exports = {
    imageHandler
};
