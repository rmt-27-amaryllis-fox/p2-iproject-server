const axios = require("axios");

const tmdbInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: { api_key: process.env.TMDB_APIKEY },
});

const sendgridInstance = axios.create({
    baseURL: "https://rapidprod-sendgrid-v1.p.rapidapi.com",
    headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
    },
});

module.exports = {
    tmdbInstance,
    sendgridInstance
};
