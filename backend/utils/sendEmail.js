const nodemailer = require("nodemailer");
const generateOTP = require("./generateOtp");

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

    // HTML content for the welcome email
    const welcomeEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Gamefolio!</title>
</head>
<body>
  <h1>Welcome to Gamefolio!</h1>
  <p>Dear {{username}},</p>
  <p>Thank you for joining Gamefolio! We're excited to have you as part of our community.</p>
  <p>Your account has been successfully created. Here are some important details:</p>
  <ul>
    <li><strong>Username:</strong> {{username}}</li>
    <li><strong>Email:</strong> {{email}}</li>
  </ul>
  <p>Feel free to explore our platform and discover the features we offer. If you have any questions or need assistance, don't hesitate to contact our support team.</p>
  <p>Thank you again for choosing Gamefolio!</p>
  <p>Best regards,<br>Your Gamefolio Team</p>
</body>
</html>
`;

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

    // HTML content for the welcome email
    const forgetOtpEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password Request!</title>
</head>
<body>
<h1>Reset Your Password - Gamefolio</h1>
  <p>Dear User,</p>
  <p>We received a request to reset your password for your Gamefolio account.</p>
  <p>Here are the details for resetting your password:</p>
  <ul>
    <li><strong>Email:</strong> {{email}}</li>
    <li><strong>Verification Code:</strong> {{otp}}</li>
  </ul>
  <p>If you did not request a password reset, please ignore this email. The verification code is valid for a limited time.</p>
  <p>Thank you for using Gamefolio!</p>
  <p>Best regards,<br>Your Gamefolio Team</p>
</body>
</html>
`;

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

module.exports = { sendEmail, sendForgotOtpEmail };
