const nodemailer = require("nodemailer");
const generateOTP = require("./generateOtp");

const { AUTH_EMAIL, AUTH_PASS } = process.env;
const sendEmail = (email, otp) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      to: email,
      subject: "Otp for registration is: " + otp,
      html: ``,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject("Error sending OTP");
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        resolve("OTP sent successfully");
      }
    });
  });
};

module.exports = sendEmail;
