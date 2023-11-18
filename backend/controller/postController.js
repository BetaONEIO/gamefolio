const Posts = require("../models/Posts.js"); // Import your Mongoose model

// Create a new post
const postVideo = async (req, res) => {
  try {
    const { userID, title, video, description, game, music } = req.body;
    const newPost = new Posts({
      userID,
      title,
      video,
      description,
      game,
      music,
    });

    const post = await newPost.save();

    res.status(201).json({ data: post, message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Could not create the post.",
      error: "Could not create the post.",
    });
  }
};

// Get all posts
const getAllPostVideos = async (req, res) => {
  try {
    const posts = await Posts.find().populate("userID");
    res
      .status(201)
      .json({ data: posts, message: "Successfully Retrieve Post Videos" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Could not retrieve posts.",
      message: "Could not retrieve posts.",
    });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not retrieve the post." });
  }
};

// Update a post by ID
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedData = req.body;

    const post = await Posts.findByIdAndUpdate(postId, updatedData, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the post." });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the post." });
  }
};

// Create a new reaction for a post
const createReaction = async (req, res) => {
  try {
    // const postId = req.params.id;
    const { postId, userID, reactionType } = req.body;

    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const newReaction = {
      userID,
      reactionType,
    };

    post.reactions.push(newReaction);
    const updatedPost = await post.save();

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the reaction." });
  }
};

// Create a new comment for a post
const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userID, commentText } = req.body;

    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const newComment = {
      userID,
      commentText,
    };

    post.comments.push(newComment);
    const updatedPost = await post.save();

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the comment." });
  }
};

// Create a new share for a post
const createShare = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userID } = req.body;

    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const newShare = {
      userID,
    };

    post.share.push(newShare);
    const updatedPost = await post.save();

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the share." });
  }
};

// Get all reactions for a post
const getAllReactions = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const reactions = post.reactions;
    res.status(200).json(reactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not retrieve reactions." });
  }
};

// Get all comments for a post
const getAllComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const comments = post.comments;
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not retrieve comments." });
  }
};

// Get all shares for a post
const getAllShares = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const shares = post.share;
    res.status(200).json(shares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not retrieve shares." });
  }
};

// Delete a reaction by ID
const deleteReaction = async (req, res) => {
  try {
    const postId = req.params.id;
    const reactionId = req.params.reactionId;

    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    post.reactions.id(reactionId).remove();
    const updatedPost = await post.save();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the reaction." });
  }
};

// Delete a comment by ID
const deleteComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentId = req.params.commentId;

    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    post.comments.id(commentId).remove();
    const updatedPost = await post.save();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the comment." });
  }
};

// Delete a share by ID
const deleteShare = async (req, res) => {
  try {
    const postId = req.params.id;
    const shareId = req.params.shareId;

    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    post.share.id(shareId).remove();
    const updatedPost = await post.save();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the share." });
  }
};

// Update a reaction by ID
const updateReaction = async (req, res) => {
  try {
    const postId = req.params.id;
    const reactionId = req.params.reactionId;
    const { reactionType } = req.body;

    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const reactionToUpdate = post.reactions.id(reactionId);
    if (!reactionToUpdate) {
      return res.status(404).json({ error: "Reaction not found." });
    }

    reactionToUpdate.reactionType = reactionType;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the reaction." });
  }
};

// Update a comment by ID
const updateComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const { commentText } = req.body;

    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const commentToUpdate = post.comments.id(commentId);
    if (!commentToUpdate) {
      return res.status(404).json({ error: "Comment not found." });
    }

    commentToUpdate.commentText = commentText;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the comment." });
  }
};

// Update a share by ID
const updateShare = async (req, res) => {
  try {
    const postId = req.params.id;
    const shareId = req.params.shareId;
    const { userID } = req.body;

    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const shareToUpdate = post.share.id(shareId);
    if (!shareToUpdate) {
      return res.status(404).json({ error: "Share not found." });
    }

    shareToUpdate.userID = userID;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the share." });
  }
};

module.exports = {
  postVideo,
  getAllPostVideos,
  getPostById,
  updatePost,
  deletePost,
  createReaction,
  createComment,
  createShare,
  getAllReactions,
  getAllComments,
  getAllShares,
  deleteReaction,
  deleteComment,
  deleteShare,
  updateReaction,
  updateComment,
  updateShare,
};
