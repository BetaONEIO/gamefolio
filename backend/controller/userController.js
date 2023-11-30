const asyncHandler = require("express-async-handler");
const User = require("../models/Users.js");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken.js");
const generateOTP = require("../utils/generateOtp.js");
const sendEmail = require("../utils/sendEmail.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  console.log("req.body: ", req.body);

  // check if email exists in db
  const userExists = await User.findOne({ email });

  console.log(
    "SIGNUP: ",
    name,
    username,
    email,
    password,
    "userExists: ",
    userExists
  );

  if (userExists) {
    return res.status(404).json({ message: "User already exist" });
    // throw new Error("User already exists");
  }

  // create new user document in db
  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  if (user) {
    console.log("API CALLED");
    res.status(201).json({
      _id: user._id,
      AccountStatus: user.AccountStatus,
      role: user.Role,
      name: user.name,
      username: user.username,
      email: user.email,
      message: "Successfully Sign Up",
    });
  } else {
    return res.status(400).json({
      message: "Invalid user data",
    });
    // throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user email exists in db
  const user = await User.findOne({ email });

  // return user obj if their password matches
  if (user && (await user.matchPassword(password))) {
    // if (user.AccountStatus === "pending") {
    //   res.status(402).send("Please verify your email first");
    //   throw new Error("Please verify your email first");
    // }

    // verified token returns user id
    const decoded = jwt.verify(generateToken(user._id), process.env.JWT_SECRET);
    console.log("decode: ", decoded);
    console.log({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      // password: user.password,
      token: generateToken(user._id),
    });

    return res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      preferences: user.preferences,
      favoriteGames: user.favoriteGames,
      bio: user.bio,
      dateOfBirth: user.dateOfBirth,
      token: generateToken(user._id),
      message: "Successfully Sign in",
    });
  } else {
    return res.status(400).json({
      message: "Sorry! We were unable to log you in, please try again later",
    });
    // throw new Error("Login failed. Email or password is incorrect.");
  }
});

const sendEmailOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  console.log("EMAIL : ", email);

  // check if user email exists in db
  const user = await User.findOne({ Email: email });
  console.log("user: ", user);

  // return user obj if their password matches
  if (user) {
    let otp = generateOTP();
    let mysendEmail = await sendEmail(email, otp);
    console.log("yess: ", mysendEmail);
    if (mysendEmail) {
      res.json(otp);
    } else {
      res.json({ message: "error" });
    }
  } else {
    return res.status(401).send("User already exist  ");
  }
});

const verifyEmailOTP = asyncHandler(async (req, res) => {
  const { email, inputOtp, otpCode } = req.body;

  console.log("EMAIL : ", email);

  const verifyOtp = async (otp, inputOtp) => {
    if (otp === inputOtp) {
      user.AccountStatus = "verified";
      await user.save();
      return "correct";
    } else {
      return "wrong";
    }
  };

  // check if user email exists in db
  const user = await User.findOne({ Email: email });

  // return user obj if their password matches
  if (user) {
    // let otp = generateOTP();
    let myOtpVerification = await verifyOtp(otpCode, inputOtp);
    console.log("yess: ", myOtpVerification);
    if (myOtpVerification === "correct") {
      return res.json("verified");
    } else {
      res.status(401).json({ error: "Wrong OTP" });
      throw new Error("Wrong OTP");
    }
  } else {
    return res.status(401).send("Something went wrong");
  }
});

const updateLoginUser = asyncHandler(async (req, res) => {
  console.log("req.decodeduid::<<>> ", req.decodeduid);

  const user = await User.findById(req.decodeduid);

  // return user obj if their password matches
  if (user) {
    console.log({
      _id: user._id,
      firstName: user.FirstName,
      lastName: user.LastName,
      email: user.email,
      role: user.Role,
      phoneNumber: user.PhoneNumber,
    });
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePicture: user.profilePicture,
      dateOfBirth: user.dateOfBirth,
      userToken: req.token,
    });
  } else {
    return res.status(401).send("Something went wrong ");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  // req.user was set in authMiddleware.js
  console.log("req.body.userToken: ", req.body.userToken);
  const decoded = jwt.verify(req.body.userToken, process.env.JWT_SECRET);

  console.log("decoded: ", decoded);

  const user = await User.findById(decoded.id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePicture: user.profilePicture,
      dateOfBirth: user.dateOfBirth,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  // req.user was set in authMiddleware.js

  console.log("yess api called");
  const users = await User.find();

  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  // check if user email exists in db
  const user = await User.findOne({ Email: email });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user && (await user.matchPassword(currentPassword))) {
    user.Password = newPassword;
    await user.save();
    res.json({ user });
    // return user;
  } else {
    res.status(400).send("Wrong password");
  }
});

const addPreferences = asyncHandler(async (req, res) => {
  const { userID, preference } = req.body;

  console.log("req.body: ", req.body);

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.preferences = preference;
    await user.save();

    res.status(200).json({ message: "Preferences updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const addFavoriteGames = asyncHandler(async (req, res) => {
  const { userID, favoriteGame } = req.body;

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favoriteGames = favoriteGame;
    await user.save();

    res.status(200).json({ message: "Favorite games updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Controller to update user profile
const updateProfile = async (req, res) => {
  const {
    userID,
    name,
    username,
    profilePicture,
    dateOfBirth,
    bio,
    accountType,
  } = req.body;

  try {
    // Find the user by ID
    console.log("updateProfile: ", req.body);
    let user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user object with new profile information
    user.name = name || user.name;
    user.username = username || user.username;
    user.profilePicture = profilePicture || user.profilePicture;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.bio = bio || user.bio;
    user.accountType = accountType || user.accountType;

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log("error: ", error.message);
    res
      .status(500)
      .json({ message: "Could not update profile", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateLoginUser,
  getUserProfile,
  getAllUsers,
  sendEmailOTP,
  verifyEmailOTP,
  updatePassword,
  addPreferences,
  addFavoriteGames,
  updateProfile,
};
