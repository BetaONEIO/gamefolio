const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/verify/username", userController.signupVerifyUsername);

module.exports = router;
