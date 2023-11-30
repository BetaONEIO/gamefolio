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
router.post("/updatePassword", authMiddleware, userController.updatePassword);
router.get("/updatesignin", authMiddleware, userController.updateLoginUser);
// router.route("/profile").get(protect, userController.getUserProfile);
router.post("/getUser", userController.getUserProfile);
router.get("/", userController.getAllUsers);

module.exports = router;
