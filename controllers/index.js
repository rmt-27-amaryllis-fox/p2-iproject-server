const { verifyHash } = require("../helpers/bcrypt");
const { generateTokenFromPayload } = require("../helpers/jwt");
const { User, Job, MyJob } = require("../models");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const newUser = await User.create({ email, password, role });
      res
        .status(201)
        .json({ id: newUser.id, email: newUser.email, role: newUser.role });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "EmailRequired" };
      }

      if (!password) {
        throw { name: "PasswordRequired" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "Unauthorized" };
      }

      const isMatchPassword = verifyHash(password, user.password);

      if (!isMatchPassword) {
        throw { name: "Unauthorized" };
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = generateTokenFromPayload(payload);

      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      // console.log(req.headers)
      const { token_google } = req.headers;

      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: token_google,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "GOOGLE",
          role: "Staff",
          phoneNumber:"5879034670",
          address:"Nether P3 Minecraft"
        },
        hook: false,
      });

      const access_token = createTokenFromData({ id: user.id });
      res
        .status(200)
        .json({
          access_token: access_token,
          username: user.username,
          rolegoogle: user.role,
          id: user.id,
        });
    } catch (err) {
        next(err)
    }
  }

  static async getJobs(req, res, next) {
    try {
      const jobs = await Job.findAll();
      res.status(200).json(jobs);
    } catch (err) {
      next(err);
    }
  }

  static async getJobsDetailById(req, res, next) {
    try {
      const id = req.params.jobId
      const jobs = await Job.findByPk(id);
      res.status(200).json(jobs);
    } catch (err) {
      next(err);
    }
  }

  static async homeMyJobs(req, res, next) {
    try {
      const UserId = req.user.id;
      const myjobs = await MyJob.findAll({
        include: [{ model: Job, attributes: { exclude: ["id"] } }],
        where: { UserId },
      });
      res.status(200).json(myjobs);
    } catch (err) {
      next(err);
    }
  }

  static async postMyJobsByJobId(req, res, next) {
    try {
      const UserId = req.user.id;
      const JobId = req.params.jobId;
      const job = await Job.findByPk(JobId);

      if (!job) {
        throw { name: "NotFound" };
      }

      const myjob = await MyJob.create({ UserId, JobId });

      res.status(201).json(myjob);
    } catch (err) {
      next(err);
    }
  }

  static async patchCandidateStatusbyId(req, res, next) {
    try {
      const status = req.body.status;
      // console.log(status)
      const id = req.params.jobId;
      console.log(id);

      const myjobs = await MyJob.update(
        { status: status },
        {
          where: {
            JobId: id,
          },
        }
      );

      const candidateList = await MyJob.findAll({
        include: {
          model: User,
          required: true,
          attributes: { exclude: ["password"] },
          where: { role: "Candidate" },
        },
      });

        res.status(200).json('Candidate  Status has been updated');

    //   const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     port: 587,
    //     secure: false,
    //     auth: {
    //       user: "nakanomiku45@gmail.com",
    //       pass: "zqkhmnunahalpbyv",
    //     },
    //   });

    //   const sendMail = (email) => {
    //     const options = {
    //       from: "'Recruitment' <no-reply@gmail.com>",
    //       to: email,
    //       subject: "Testing Email",
    //       text: "Hello World ",
    //     };
    //     transporter.sendMail(
    //       (options,
    //       (err, info) => {
    //         if (err) console.log(err);
    //         console.log(`Email has been sent`);
    //       })
    //     );
    //   };

    //   if(!myjobs){
    //     sendMail('lutheryosis@gmail.com')
    //   }

    } catch (err) {
      next(err);
    }
  }

  static async addJob (req,res,next){
    try {
      const {title, type, location, requirement, position, test_date } = req.body
      const { data } = await Job.create({title, type, location, requirement, position, test_date})

      if(!data){
        throw {}
      }

      res.status(201).json('success add job')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller;
