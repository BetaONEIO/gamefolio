const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userID: {
    type: String,
  },
  title: {
    type: String,
  },
  video: {
    type: String,
    unique: true,
  },
  reactions: [
    {
      userID: {
        type: String,
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
