const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/signup", userController.registerUser);
router.put("/profile/update", userController.updateProfile);
router.put("/cover/update", userController.updateCover);
router.post("/preferences/create", userController.addPreferences);
router.post("/favorite-games/create", userController.addFavoriteGames);

// router.post("/signup/emailotp/sent", userController.sendEmailOTP);
// router.post("/signup/emailotp/verify", userController.verifyEmailOTP);

router.post("/signin", userController.loginUser);
router.put("/password/update", userController.updatePassword);
router.get("/updatesignin", authMiddleware, userController.updateLoginUser);
router.post("/getUser", userController.getUserProfile);
router.post("/profile/get", userController.getProfileInfo);
router.get("/getAllUsers", userController.getAllUsers);
router.post("/deactivate", userController.deactivateAccount);
router.post("/username/update", authMiddleware, userController.addUsername);
router.post("/usernames/create", userController.addSocialUsernames);

//followers
router.post("/follower/create", userController.addFollowers);
router.post("/follower/delete", userController.removeFollower);
router.post("/following/delete", userController.removeFollowing);

router.post("/block/create", userController.blockUser);
router.post("/block/delete", userController.unblockUser);

router.post("/report/create", userController.report);

//notification
router.post("/notification/create", userController.createNotification);
router.put("/notification/update", userController.updateNotification);

// forget password otp
router.post("/forgot-password/otp", userController.sendForgotPasswordOTP);
router.post(
  "/forgot-password/otp/verify",
  userController.verifyForgetPasswordOTP
);
router.post("/reset-password", userController.resetPassword);

module.exports = router;
