const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  description: {
    type: String,
  },
  game: {
    type: String,
  },
  music: {
    type: String,
  },
  video: {
    type: String,
  },
  reactions: [
    {
      userID: {
        type: String,
        unique: true,
      },
      reactionType: {
        type: String,
        enum: ["like", "love"],
      },
    },
  ],
  comments: [
    {
      userID: {
        type: String,
      },
      commentText: {
        type: String,
      },
    },
  ],
  share: [
    {
      userID: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;
