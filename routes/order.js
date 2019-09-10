const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("-------------");
  const { data } = req.body;
  console.log(data);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lucky.catch.ua@gmail.com",
      pass: "Luckycatch13luckycatch13"
    }
  });

  const mailOptions = {
    from: "lucky.catch.ua@gmail.com",
    to: "myskotima130@gmail.com",
    subject: "Заказ магазина Lucky Catch",
    text: "That was easy!"
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  try {
    console.log(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
