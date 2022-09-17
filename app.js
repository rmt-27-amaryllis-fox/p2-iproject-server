const express = require("express");
const app = express();
const cors = require("cors");
const Controller = require("./controllers");
const authn = require("./middlewares/authn");
const authz = require("./middlewares/authz");
const port =  process.env.PORT || 3000

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", Controller.register);
app.post("/login", Controller.login);
// app.post('/google-sign-in',Controller.loginGoogle)

app.get("/jobs", authn, Controller.getJobs);
// app.post("/jobs", authn, authz, Controller.addJob)
// app.get("/jobs/:jobId", authn, Controller.getJobsDetailById);
// app.patch("/jobs/:jobId", authn, authz, Controller.patchCandidateStatusbyId);
app.get("/myjobs", authn, Controller.homeMyJobs);
app.post("/myjobs/:jobId", authn, Controller.postMyJobsByJobId);


// error handler
app.use((err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "EmailRequired":
      res.status(400).json({ message: "Email is required" });
      break;
    case "PasswordRequired":
      res.status(400).json({ message: "Password is required" });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      break;
    case "Unauthorized":
      res.status(401).json({ message: "Invalid email/password" });
      break;
    case "Forbidden":
      res.status(403).json({ message: "You are not authorized" });
      break;
    case "NotFound":
      res.status(404).json({ message: "Job not found" });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
