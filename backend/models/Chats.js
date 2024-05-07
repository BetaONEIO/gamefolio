const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  ],

  roomID: {
    type: String,
    required: true,
  },

  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
      type: {
        type: String,
        enum: ["sharepost", "initiated"],
      },
      postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
        required: function () {
          return this.type === "sharepost";
        },
      },
      content: {
        type: String,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Chats = mongoose.model("Chats", chatSchema);
module.exports = Chats;
