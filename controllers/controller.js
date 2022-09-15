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
                                "Please click this link to verify : " +
                                `${process.env.BASE_URL}/confirmation/${token}`,
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
            res.status(200).json({ message: "Verified" });
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
            const { page } = req.query;
            const { data } = await tmdbInstance({
                url: "/movie/popular",
                method: "GET",
                params: { page: page },
            });
            const config = await tmdbInstance({
                url: "/configuration",
                method: "GET",
            });
            const movies = data.results.map(
                ({ id, title, release_date, poster_path }) => {
                    let poster =
                        config.data.images.secure_base_url +
                        "original" +
                        poster_path;
                    return { id, title, release_date, poster };
                }
            );
            res.status(200).json({ page, movies });
        } catch (err) {
            next(err);
        }
    }

    static async fetchSeries(req, res, next) {
        try {
            const { page } = req.query;
            const { data } = await tmdbInstance({
                url: "/tv/popular",
                method: "GET",
                params: { page: page },
            });
            const config = await tmdbInstance({
                url: "/configuration",
                method: "GET",
            });
            const series = data.results.map(
                ({ id, name, first_air_date, poster_path }) => {
                    let poster =
                        config.data.images.secure_base_url +
                        "original" +
                        poster_path;
                    return { id, name, release_date: first_air_date, poster };
                }
            );
            res.status(200).json({ page, series });
        } catch (err) {
            next(err);
        }
    }

    static async getMovieDetail(req, res, next) {
        try {
            const { id } = req.params;

            const { data } = await tmdbInstance({
                url: "/movie/" + id,
                method: "GET",
            });
            const getCast = await tmdbInstance({
                url: `/movie/${id}/credits`,
                method: "GET",
            });
            const getProvider = await tmdbInstance({
                url: `/movie/${id}/watch/providers`,
                method: "GET",
            });
            const getSimiliar = await tmdbInstance({
                url: "/movie/" + id + "/similar",
                method: "GET",
            });
            const config = await tmdbInstance({
                url: "/configuration",
                method: "GET",
            });

            const imageHandler =
                config.data.images.secure_base_url + "original";

            const { cast } = getCast.data;

            let provider = getProvider.data.results;
            if (!provider.ID || !provider.ID.flatrate) {
                provider = {};
            } else {
                provider = provider.ID.flatrate.map((el) => {
                    return {
                        name: el.provider_name,
                        img: imageHandler + el.logo_path,
                    };
                });
            }

            const similiar = getSimiliar.data.results
                .map((el) => {
                    return {
                        id: el.id,
                        title: el.title,
                        poster_path: imageHandler + el.poster_path,
                        release_date: el.release_date,
                    };
                })
                .slice(0, 5);

            const detailMovie = {
                id: data.id,
                backdrop_path: imageHandler + data.backdrop_path,
                budget: data.budget,
                genres: data.genres
                    .map((el) => {
                        return el.name;
                    })
                    .join(", "),
                overview: data.overview,
                release_date: data.release_date,
                revenue: data.revenue,
                status: data.status,
                title: data.title,
            };
            const detailCast = cast
                .map((el) => {
                    return {
                        name: el.name,
                        photo: imageHandler + el.profile_path,
                        as: el.character,
                    };
                })
                .slice(0, 8);
            res.status(200).json({
                movie: detailMovie,
                cast: detailCast,
                similiar,
                provider,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async getSeriesDetail(req, res, next) {
        try {
            const { id } = req.params;

            const { data } = await tmdbInstance({
                url: "/tv/" + id,
                method: "GET",
            });
            const getCast = await tmdbInstance({
                url: `/tv/${id}/credits`,
                method: "GET",
            });
            const getProvider = await tmdbInstance({
                url: `/tv/${id}/watch/providers`,
                method: "GET",
            });
            const config = await tmdbInstance({
                url: "/configuration",
                method: "GET",
            });

            const imageHandler =
                config.data.images.secure_base_url + "original";

            const { cast } = getCast.data;
            const { crew } = getCast.data;
            const producer = crew.filter(
                (el) => el.job === "Executive Producer"
            );

            let provider = getProvider.data.results;
            if (!provider.ID || !provider.ID.flatrate) {
                provider = {};
            } else {
                provider = provider.ID.flatrate.map((el) => {
                    return {
                        name: el.provider_name,
                        img: imageHandler + el.logo_path,
                    };
                });
            }

            const detailSeries = {
                id: data.id,
                backdrop_path: imageHandler + data.backdrop_path,
                genres: data.genres
                    .map((el) => {
                        return el.name;
                    })
                    .join(", "),
                overview: data.overview,
                first_air_date: data.first_air_date,
                title: data.name,
            };
            const detailCast = cast
                .map((el) => {
                    return {
                        name: el.name,
                        photo: imageHandler + el.profile_path,
                        as: el.character,
                    };
                })
                .slice(0, 8);
            res.status(200).json({
                series: detailSeries,
                cast: detailCast,
                provider,
            });
        } catch (err) {
            next(err);
        }
    }

    static async postWatchlistMovie(req, res, next) {
        try {
            const checkStatus = await User.findByPk(req.user.id);
            if (checkStatus.status !== "Verified")
                throw { name: "not_verified" };
            const { movieId } = req.params;

            // check duplicate
            const checkDuplicate = await Watchlist.findAll({
                where: { UserId: checkStatus.id },
            });

            checkDuplicate.forEach((el) => {
                if (movieId == el.movie_id)
                    throw { name: "duplicate_watchlist" };
            });

            const { data } = await tmdbInstance({
                url: "/movie/" + movieId,
                method: "GET",
            });
            const config = await tmdbInstance({
                url: "/configuration",
                method: "GET",
            });
            const imgConfig = config.data.images.secure_base_url + "original";

            const createWatchlist = await Watchlist.create({
                title: data.title,
                release_year: data.release_date,
                img_url: imgConfig + data.poster_path,
                movie_id: data.id,
                kind: "movie",
                UserId: req.user.id,
            });

            res.status(201).json(createWatchlist);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async postWatchlistSeries(req, res, next) {
        try {
            const checkStatus = await User.findByPk(req.user.id);
            if (checkStatus.status !== "Verified")
                throw { name: "not_verified" };
            const { seriesId } = req.params;
            // check duplicate
            const checkDuplicate = await Watchlist.findAll({
                where: { UserId: checkStatus.id },
            });
            checkDuplicate.forEach((el) => {
                if (seriesId == el.movie_id)
                    throw { name: "duplicate_watchlist" };
            });

            const { data } = await tmdbInstance({
                url: "/tv/" + seriesId,
                method: "GET",
            });
            const config = await tmdbInstance({
                url: "/configuration",
                method: "GET",
            });
            const imgConfig = config.data.images.secure_base_url + "original";

            const createWatchlist = await Watchlist.create({
                title: data.name,
                release_year: data.first_air_date,
                img_url: imgConfig + data.poster_path,
                movie_id: data.id,
                kind: "series",
                UserId: req.user.id,
            });

            res.status(201).json(createWatchlist);
        } catch (err) {
            next(err);
        }
    }

    static async getWatchlists(req, res, next) {
        try {
            const watchlists = await Watchlist.findAll({
                where: { UserId: req.user.id },
            });
            res.status(200).json(watchlists);
        } catch (err) {
            next(err);
        }
    }

    static async deleteWatchlist(req, res, next) {
        try {
            const { id } = req.params;
            await Watchlist.destroy({ where: { id } });
            res.status(200).json({ message: "Success delete watchlist" });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async search(req, res, next) {
        try {
            const { query, page } = req.query;
            const { data } = await tmdbInstance({
                url: "/search/multi",
                method: "GET",
                params: {
                    page,
                    query
                }
            })
            if (!data) throw { name: "no_found" }
            const config = await tmdbInstance({
                url: "/configuration",
                method: "GET",
            });
            const imgHandler = config.data.images.secure_base_url + "original"
            data.results.forEach(el => {
                el.poster_path = imgHandler + el.poster_path
            });
            res.status(200).json(data)
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    Controller,
};
