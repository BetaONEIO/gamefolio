const express = require("express");
const router = express.Router();
const postController = require("../controller/postController.js");

// Create a new post video
router.post("/video/create", postController.postVideo);

// Get all posts
router.get("/video/get", postController.getAllPostVideos);

// Delete a video post by ID
router.post("/video/delete", postController.deletePost);

// Get a single post by ID
router.get("/get/:id", postController.getPostById);

// Update a post by ID
router.put("/update/:id", postController.updatePost);

// Delete a post by ID
router.delete("/delete/:id", postController.deletePost);

// Create a new reaction for a post
router.post("/video/reaction/create", postController.createVideoReaction);

// Create a new comment for a post
router.post("/comment/create", postController.createComment);

// Create a new share for a post
router.post("/share/create", postController.createShare);

// Get all reactions for a post
router.get("/reaction/get", postController.getAllReactions);

// Get all comments for a post
router.get("/comment/get", postController.getAllComments);

// Get all shares for a post
router.get("/share/get", postController.getAllShares);

// Update a reaction by ID
router.put("/reaction/update", postController.updateReaction);

// Update a comment by ID
router.put("/comment/update", postController.updateComment);

// Update a share by ID
router.put("/share/update", postController.updateShare);

// Delete a reaction by ID
router.delete("/reaction/delete", postController.deleteReaction);

// Delete a comment by ID
router.delete("/comment/delete", postController.deleteComment);

// Delete a share by ID
router.delete("/share/delete", postController.deleteShare);

module.exports = router;
