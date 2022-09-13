const { sendgridInstance, tmdbInstance } = require("../helpers/axiosInstance");
const { comparePass } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { User, Watchlist } = require("../models");

class Controller {
    static async register(req, res, next) {
        try {
            const { fullname, email, password } = req.body;
            let token =
                Math.random().toString(36).substr(2) +
                Math.random().toString(36).substr(2);
            const createUser = await User.create({
                fullname,
                email,
                password,
                status: "Unverified",
                token,
            });
            // disini kirim email pake SendGrid buat verifikasi
            await sendgridInstance({
                url: "/mail/send",
                method: "POST",
                data: {
                    personalizations: [
                        {
                            to: [
                                {
                                    email: email,
                                },
                            ],
                            subject: "Please verify your email",
                        },
                    ],
                    from: {
                        name: "Vox8",
                        email: "hello@vox8.com",
                    },
                    content: [
                        {
                            type: "text/html",
                            value:
                                "Please click this link to verify : https://vox-eight.web.app/?token=" +
                                token,
                        },
                    ],
                },
            });
            res.status(201).json({
                id: createUser.id,
                email: createUser.email,
            });
        } catch (err) {
            next(err);
        }
    }

    static async verification(req, res, next) {
        try {
            const { token } = req.params;
            const verify = await User.findOne({ where: { token } });
            if (!verify) throw { name: "invalid_token" };
            await User.update({ status: "Verified" }, { where: { token } });
            res.status(200).json({ message: "Success verification" });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw { name: "invalid_email/pass" };
            const user = await User.findOne({ where: { email } });
            if (!user) throw { name: "invalid_email/pass" };
            const compare = comparePass(password, user.password);
            if (!compare) throw { name: "invalid_email/pass" };
            const payload = { id: user.id };
            const access_token = signToken(payload);
            res.status(200).json({ access_token });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async fetchMovie(req, res, next) {
        try {
            const { data } = await tmdbInstance({
                url: "/movie/popular",
                method: "GET",
            });
            const config = await tmdbInstance({
                url: "/configuration",
                method: "GET"
            })
            const movies = data.results.map(({title, release_date, poster_path}) => {
                let poster = config.data.images.secure_base_url + "original" + poster_path
                return {title, release_date, poster}
            })
            res.status(200).json(movies)
        } catch (err) {
            next(err);
        }
    }

    static async fetchSeries(req, res, next) {
        try {
            const { data } = await tmdbInstance({
                url: "/tv/popular",
                method: "GET",
            });
            const config = await tmdbInstance({
                url: "/configuration",
                method: "GET"
            })
            const series = data.results.map(({name, first_air_date, poster_path}) => {
                let poster = config.data.images.secure_base_url + "original" + poster_path
                return {name, first_air_date, poster}
            })
            res.status(200).json(series)
        } catch (err) {
            next(err);
        }
    }

    static async getMovieDetail(req, res, next) {
        try {
            const { id } = req.params

            const { data } = await tmdbInstance({
                url: "/movie/" + id,
                method: "GET"
            })
            const getCast = await tmdbInstance({
                url: `/movie/${id}/credits`,
                method: "GET"
            })
            const getProvider = await tmdbInstance({
                url: `/movie/${id}/watch/providers`,
                method: "GET"
            })
            const getSimiliar = await tmdbInstance({
                url: '/movie/' + id + '/similar',
                method: "GET"
            })
            const config = await tmdbInstance({
                url: "/configuration",
                method: "GET"
            })

            const {cast} = getCast.data
            const {crew} = getCast.data
            const director = crew.filter(el => el.job === "Director")
            let provider = {
                subs: getProvider.data.results.ID.flatrate.map(el => {
                    return {
                        name: el.provider_name,
                        img: config.data.images.secure_base_url + "original" + el.logo_path
                    }
                }),
                buy: getProvider.data.results.ID.buy.map(el => {
                    return {
                        name: el.provider_name,
                        img: config.data.images.secure_base_url + "original" + el.logo_path
                    }
                })
            }
            const similiar = getSimiliar.data.results.map(el => {
                return {
                    title: el.title,
                    poster_path: config.data.images.secure_base_url + "original" + el.poster_path,
                    release_date: el.release_date
                }
            })

            const detailMovie = {
                backdrop_path: config.data.images.secure_base_url + "original" + data.backdrop_path,
                budget: data.budget,
                genres: data.genres,
                overview: data.overview,
                release_date: data.release_date,
                revenue: data.revenue,
                status: data.status,
                title: data.title,
            }
            const detailCast = cast.map(el => {
                return {
                    name: el.name,
                    photo: config.data.images.secure_base_url + "original" + el.profile_path,
                    as: el.character
                }
            })
            res.status(200).json({movie: detailMovie, cast: detailCast, provider, director: director[0].name, similiar})
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async postWatchlist(req, res, next) {
        try {
            const { movieId } = req.params
            const { data } = await tmdbInstance({
                url: "/movie/" + movieId,
                method: "GET"
            })
            const config = await tmdbInstance({
                url: "/configuration",
                method: "GET"
            })
            const imgConfig = config.data.images.secure_base_url + "original"

            let getProvider = await tmdbInstance({
                url: `/movie/${movieId}/watch/providers`,
                method: "GET"
            })
            const watch_provider = getProvider.data.results.ID.flatrate.map(el => {
                return imgConfig + el.logo_path
            })
            const createWatchlist = await Watchlist.create({
                title: data.title,
                release_year: data.release_date,
                img_url: imgConfig + data.poster_path,
                watch_provider: watch_provider[0],
                UserId: req.user.id
            })
            
            res.status(201).json(createWatchlist)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

}

module.exports = {
    Controller,
};
