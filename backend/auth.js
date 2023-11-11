// const User = require("./models/Users.js");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
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
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:4000/auth/google/callback",
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
