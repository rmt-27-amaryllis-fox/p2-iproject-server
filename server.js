const nodemailer = require("nodemailer");
// require('dotenv').config()
//step1

async function nodeMail(email, virtualAccount) {
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hai.warungku@gmail.com",
      pass: "yricxuevjzvsyxxm",
    },
  });

  //step2
  let mailOptions = {
    from: "hai.warungku@gmail.com",
    to: email,
    subject: "Virtual Account Number for Payment",
    text: `Berikut nomer VA anda :${virtualAccount}`,
  };

  //step3
  await transporter
    .sendMail(mailOptions)
    .then((data) => console.log("email sent!"))
    .catch((err) => console.log("error!"));
}

module.exports = nodeMail;
