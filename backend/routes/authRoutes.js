const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/verify-email", userController.verifyEmailLink);

module.exports = router;
