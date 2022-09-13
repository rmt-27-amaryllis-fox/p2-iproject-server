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
}

module.exports = {
    Controller,
};
