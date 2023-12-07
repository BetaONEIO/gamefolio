const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/signup", userController.registerUser);
router.put("/profile/update", userController.updateProfile);
router.post("/preferences/create", userController.addPreferences);
router.post("/favorite-games/create", userController.addFavoriteGames);
router.post("/signup", userController.registerUser);
router.post("/signup/emailotp/sent", userController.sendEmailOTP);
router.post("/signup/emailotp/verify", userController.verifyEmailOTP);
router.post("/signin", userController.loginUser);
router.put("/password/update", userController.updatePassword);
router.get("/updatesignin", authMiddleware, userController.updateLoginUser);
// router.route("/profile").get(protect, userController.getUserProfile);
router.post("/getUser", userController.getUserProfile);
router.post("/profile/get", userController.getProfileInfo);
router.get("/getAllUsers", userController.getAllUsers);

//followers
router.post("/follower/create", userController.addFollowers);

module.exports = router;
