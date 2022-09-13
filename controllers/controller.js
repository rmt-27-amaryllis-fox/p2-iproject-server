const { sendgridInstance } = require("../helpers/axiosInstance");
const {comparePass} = require("../helpers/bcryptjs");
const {signToken} = require("../helpers/jwt");
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
            const { data } = await sendgridInstance({
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

}

module.exports = {
    Controller,
};
