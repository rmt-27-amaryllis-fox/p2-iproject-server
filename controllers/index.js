const axios = require('axios');
const querystring = require('querystring');

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

class Controller {
    static login(req, res, next) {
        const scope = `user-modify-playback-state
            user-read-playback-state
            user-read-currently-playing
            user-library-modify
            user-library-read
            user-top-read
            user-read-private
            user-read-email
            playlist-read-private
            playlist-modify-public
            playlist-modify-private`;
        const queryParams = querystring.stringify({
            client_id: SPOTIFY_CLIENT_ID,
            response_type: 'code',
            redirect_uri: SPOTIFY_REDIRECT_URI,
            scope: scope
        });
        res.status(200).json(queryParams);
    };

    static callback(req, res, next) {
        const code = req.query.code || null;
        axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: SPOTIFY_REDIRECT_URI
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${new Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
            },
        })
            .then(response => {
                const query = querystring.stringify(response.data);
                res.redirect(`${process.env.SPOTIFY_CLIENT_REDIRECTURI}?${query}`);
            })
            .catch(error => {
                res.status(500).json({message: 'Internal server error'});
            });
    };

    // static refreshToken(req, res, next) {
    //     console.log('through refresh')
    //     const { refresh_token } = req.query;
    //     axios({
    //         method: 'post',
    //         url: 'https://accounts.spotify.com/api/token',
    //         data: querystring.stringify({
    //             grant_type: 'refresh_token',
    //             refresh_token: refresh_token
    //         }),
    //         headers: {
    //             'content-type': 'application/x-www-form-urlencoded',
    //             Authorization: `Basic ${new Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    //         },
    //     })
    //         .then(response => {
    //             res.send(response.data);
    //         })
    //         .catch(error => {
    //             res.send(error);
    //         });
    // };

    static user(req, res, next) {
        const access_token = req.headers.access_token;
        axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
            .then(response => {
                console.log(response.data)
                res.status(200).json(response.data);
            })
            .catch(error => {
                res.status(error.response.data.status).json(error.response.data.message);
            });
    };

    static browseNewReleases(req, res, next) {
        const access_token = req.headers.access_token;
        axios({
            method: 'get',
            url: `https://api.spotify.com/v1/browse/new-releases`,
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
            .then(response => {
                let items = response.data.albums.items;
                let cutData = items.slice(0, 5);
                cutData = cutData.map(el => {
                    let { id, name, images, artists } = el;
                    const image = images[0].url;
                    const artistsName = [];
                    artists.forEach(el => {
                        artistsName.push(el.name);
                    });
                    const artist = artistsName.join(', ')
                    return { id, name, image, artist };
                })
                console.log(cutData)
                res.status(200).json(cutData);
            })
            .catch(error => {
                res.status(error.response.data.status).json(error.response.data.message);
            });
    };

    static search(req, res, next) {
        const access_token = req.headers.access_token;
        const { track } = req.query;
        let condition = track ? `name=${track}&type=album` : null;
        axios({
            method: 'get',
            url: `https://api.spotify.com/v1/search?q=${condition}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        })
            .then(response => {
                let items = response.data.albums.items;
                let cutData = items.slice(0, 5);
                cutData = cutData.map(el => {
                    let { id, name, images, artists } = el;
                    const image = images[0].url;
                    const artistsName = [];
                    artists.forEach(el => {
                        artistsName.push(el.name);
                    });
                    const artist = artistsName.join(', ')
                    return { id, name, image, artist };
                });
                res.status(200).json(cutData);
            })
            .catch(error => {
                res.status(error.response.data.status).json(error.response.data.message);
            });
    };

    static searchSimilar(req, res, next) {
        const { artist } = req.query;
        let condition = artist ? `band:${artist}` : null;
        axios({
            method: 'get',
            url: `https://tastedive.com/api/similar`,
            params: {
                q: artist,
                Type: 'music',
                limit: 10,
                k: '442307-Musicali-QCYE5GJ7'
            },
        })
            .then(response => {
                console.log(response.data.Similar);
                res.status(200).json(response.data.Similar);
            })
            .catch(error => {
                res.status(500).json({message: 'Internal server error'});
            });
    };

    static searchLyrics(req, res, next) {
        const { artist, song } = req.query;
        let title = song;
        axios({
            method: 'get',
            url: `https://api.lyrics.ovh/v1/${artist}/${title}`,
        })
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(404).json({error: "No lyrics found"});
            });
    };

    static fetchPlaylist(req, res, next) {
        const access_token = req.headers.access_token;
        const userId = req.params.id;
        axios({
            method: 'get',
            url: `https://api.spotify.com/v1/users/${userId}/playlists`,
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
            .then(response => {
                console.log(response.data.items)
                res.status(200).json(response.data.items.splice(0,6));
            })
            .catch(error => {
                res.status(error.response.data.status).json(error.response.data.message);
            });
    };

    static createPlaylist(req, res, next) {
        const { name } = req.body;
        const access_token = req.headers.access_token;
        const user_id = req.params.id;
        axios({
            method: 'post',
            url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
            body: JSON.stringify({
                name
            }),
            dataType: 'json',
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                res.status(201).json(response);
            })
            .catch(error => {
                res.status(error.response.data.status).json(error.response.data.message);
            });
    };
}

module.exports = Controller;