// const User = require("../models/Users.js");
// const passport = require("passport");
// const FacebookStrategy = require("passport-facebook").Strategy;
// require("dotenv").config();

// // Define a findOrCreate function
// const findOrCreate = (profile, done) => {
//   User.findOne({ email: profile.email }) // Create a query object
//     .exec()
//     .then((user) => {
//       if (user) {
//         return done(null, user);
//       } else {
//         // Create a new user with the Google profile information
//         const newUser = new User({
//           email: profile.id, // Change this to the appropriate field from the Google profile
//           // Add other user properties here
//         });

//         newUser
//           .save()
//           .then((savedUser) => {
//             return done(null, savedUser);
//           })
//           .catch((err) => {
//             return done(err);
//           });
//       }
//     })
//     .catch((err) => {
//       return done(err);
//     });
// };

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: "http://localhost:4000/auth/facebook/callback",
//       passReqToCallback: true,
//     },
//     (request, accessToken, refreshToken, profile, done) => {
//       console.log("PROFILE: ", profile);
//       findOrCreate(profile, done); // Call the custom findOrCreate function
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id); // Serialize the user object, you may want to use a unique identifier
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .exec()
//     .then((user) => {
//       done(null, user);
//     })
//     .catch((err) => {
//       done(err);
//     });
// });

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/Users.js");
const express = require("express");

const router = express.Router();
require("dotenv").config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: "http://localhost:4000/auth/facebook/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({
        accountId: profile.id,
        provider: "facebook",
      });
      if (!user) {
        console.log("Adding new facebook user to DB..");
        const user = new User({
          accountId: profile.id,
          name: profile.displayName,
          provider: profile.provider,
        });
        await user.save();
        console.log(user);
        return cb(null, profile);
      } else {
        console.log("Facebook User already exist in DB..");
        console.log(profile);
        return cb(null, profile);
      }
    }
  )
);

router.get("/", passport.authenticate("facebook", { scope: "email" }));

router.get(
  "/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/facebook/error",
  }),
  function (req, res) {
    // Successful authentication, redirect to success screen.
    res.redirect("/auth/facebook/success");
  }
);

router.get("/success", async (req, res) => {
  const userInfo = {
    id: req.session.passport.user.id,
    displayName: req.session.passport.user.displayName,
    provider: req.session.passport.user.provider,
  };
  res.render("fb-github-success", { user: userInfo });
});

router.get("/error", (req, res) => res.send("Error logging in via Facebook.."));

router.get("/signout", (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log("session destroyed.");
    });
    res.render("auth");
  } catch (err) {
    res.status(400).send({ message: "Failed to sign out fb user" });
  }
});

module.exports = router;
