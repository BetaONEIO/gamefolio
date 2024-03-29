const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 10 minutes
  max: 5, // limit each IP/user to 100 requests per windowMs
  keyGenerator: function (req) {
    // Customize key generation to consider both IP and user token
    return req.user ? req.token : req.ip;
  },
  handler: function (req, res, next) {
    res.status(429).json({
      message: "Too many requests, please try again later after 1 hour.",
    });
  },
});

module.exports = rateLimiter;
