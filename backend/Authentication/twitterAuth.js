const User = require("../models/Users.js");
const passport = require("passport");
const generateToken = require("../utils/generateToken.js");
const TwitterStrategy = require("passport-twitter").Strategy;
require("dotenv").config();

// Define a findOrCreate function
const findOrCreate = async (profile, done) => {
  const user = await User.findOne({
    email: profile.emails[0].value,
  });

  if (user) {
    const token = await generateToken(user._id);

    return done(null, { ...user, token });
  } else {
    try {
      const newUser = new User({
        email: profile.emails[0].value,
        profilePicture: profile.photos[0].value.replace("normal", "400x400"),
        signupMethod: "twitter",
        coverPicture:
          "https://d2m0dxds81dlzy.cloudfront.net/66dfb5a5-b198-41c4-b087-c7c4ac0f480a-banner.jpg",
        // Add other user properties here
      });

      const savedUser = await newUser.save();
      const token = await generateToken(savedUser._id);
      return done(null, { ...savedUser, token });
    } catch (err) {
      return done(err);
    }
  }
};

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/twitter/callback`,
      passReqToCallback: true,
      includeEmail: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      findOrCreate(profile, done); // Call the custom findOrCreate function
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._doc._id); // Serialize the user object, you may want to use a unique identifier
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .exec()
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
