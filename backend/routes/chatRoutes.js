const express = require("express");

const router = express.Router();
const chatController = require("../controller/chatController.js");

// Chat routes
router.post("/session/start", chatController.startChatSession);

module.exports = router;
