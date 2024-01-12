const nodemailer = require("nodemailer");
const generateOTP = require("./generateOtp");

const { AUTH_EMAIL, AUTH_PASS } = process.env;
const sendEmail = (email, otp) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "hello@gamefolio.gg", // generated ethereal user
        pass: "sGfE0OXFAkvMa5gV", // generated ethereal password
      },
    });

    var mailOptions = {
      from: '"Gamefolio" noreply@gamefolio.com', // sender address
      to: "hamzashaikhwork@gmail.com",
      subject: "Hello ✔", // Subject line
      text: "Hello {{ contact.FIRSTNAME }} , This is an SMTP message with customizations", // plain text body
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
