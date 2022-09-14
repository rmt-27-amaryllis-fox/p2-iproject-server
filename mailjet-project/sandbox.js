const Mailjet = require('node-mailjet');
const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || "72888c8811f96ab0118f6a7c79b90167",
  apiSecret: process.env.MJ_APIKEY_PRIVATE || "91c14a3072d528a80af39d4298bed221",
});
const request = mailjet.post("send", { version: "v3.1" }).request({
  Messages: [
    {
      From: {
        Email: "mauritius.william.wijaya1@gmail.com",
        Name: "William",
      },
      To: [
        {
          Email: "mauritius.william.wijaya1@gmail.com",
          Name: "William",
        },
      ],
      Subject: "Greetings from Mailjet.",
      TextPart: "My first Mailjet email",
      HTMLPart:
        "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      CustomID: "AppGettingStartedTest",
    },
  ],
});
request
  .then((result) => {
    console.log(result.body);
  })
  .catch((err) => {
    console.log(err.statusCode);
  });
