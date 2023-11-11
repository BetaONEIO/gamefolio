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
        name: profile.displayName,
        email: profile.emails[0].value,
        profilePicture: profile.photos[0].value, // Change this to the appropriate field from the Google profile
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
      callbackURL: "http://localhost:4000/auth/twitter/callback",
      passReqToCallback: true,
      includeEmail: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      // console.log("REQUEST :", request);
      console.log("PROFILE: ", profile);
      findOrCreate(profile, done); // Call the custom findOrCreate function
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("USER: serialize ", user._doc._id);
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
