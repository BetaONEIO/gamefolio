const nodemailer = require("nodemailer");
const generateOTP = require("./generateOtp");
const fs = require("fs");
const crypto = require("crypto");
const generateToken = require("./generateToken");

const { BREVO_HOST, BREVO_PORT, BREVO_USER, BREVO_PASS } = process.env;
const sendEmail = (user, otp) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: BREVO_HOST,
      port: BREVO_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: BREVO_USER,
        pass: BREVO_PASS,
      },
    });

    // Read the content of html template
    const welcomeEmail = fs.readFileSync(
      __dirname + "/email_templates/Welcome_Email.html",
      "utf-8"
    );

    // Replace placeholders with actual user data
    const userData = {
      username: user?.username,
      email: user.email,
    };

    // Replace placeholders in the email template
    const formattedEmail = welcomeEmail
      .replace(/{{username}}/g, userData.username)
      .replace(/{{email}}/g, userData.email);

    const mailOptions = {
      from: '"Gamefolio" noreply@gamefolio.com', // sender address
      to: userData.email,
      subject: "Welcome to Gamefolio", // Subject line
      html: formattedEmail,
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

const sendForgotOtpEmail = (email, otp) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: BREVO_HOST,
      port: BREVO_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: BREVO_USER,
        pass: BREVO_PASS,
      },
    });

    // Read the content of html template
    const forgetOtpEmail = fs.readFileSync(
      __dirname + "/email_templates/Forgotten_Password.html",
      "utf-8"
    );

    // Replace placeholders with actual user data
    const userData = {
      email: email,
      otp: otp,
    };

    // Replace placeholders in the email template
    const formattedEmail = forgetOtpEmail
      .replace(/{{email}}/g, userData.email)
      .replace(/{{otp}}/g, userData.otp);

    const mailOptions = {
      from: '"Gamefolio" noreply@gamefolio.com', // sender address
      to: email,
      subject: "Reset Password - Gamefolio", // Subject line
      html: formattedEmail,
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

const sendVerificationEmail = (user) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: BREVO_HOST,
      port: BREVO_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: BREVO_USER,
        pass: BREVO_PASS,
      },
    });

    // Generate a unique token for verification
    const token = generateToken(user._id);

    // Store the token in your database associated with the user
    // (This part depends on your database setup and is not shown here)

    // Create the verification link
    const verificationLink = `http://localhost:3000/verify?token=${token}`;

    // Read the content of the verification email template
    const verificationEmail = fs.readFileSync(
      __dirname + "/email_templates/Verification_Email.html",
      "utf-8"
    );

    // Replace placeholders in the email template with actual user data and verification link
    const formattedEmail = verificationEmail
      .replace(/{{username}}/g, user.username)
      .replace(/{{verificationLink}}/g, verificationLink);

    const mailOptions = {
      from: '"Gamefolio" <noreply@gamefolio.com>', // sender address
      to: user.email,
      subject: "Verify your Gamefolio account", // Subject line
      html: formattedEmail,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject("Error sending verification email");
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        resolve("Verification email sent successfully");
      }
    });
  });
};

module.exports = { sendEmail, sendVerificationEmail, sendForgotOtpEmail };
