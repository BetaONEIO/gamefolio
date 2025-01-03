const Posts = require("../models/Posts.js");
const socket = require("../utils/socket.js");
const { app } = require("../index.js");
const Chats = require("../models/Chats.js");

const server = require("http").createServer(app);

// Create a new post
exports.startChatSession = async (req, res) => {
  // Set up Socket.IO
  try {
    socket.init(server);
    res.status(200).json({ message: "Socket.io is running" });
  } catch (error) {
    res.status(401).json({ error });
 
  }
};

// Create a new chat message
exports.createChatMessage = async (req, res) => {
  try {
    const {
      sender,
      message,
      receiver,
      type,
      postID,
      content,
      video,
      roomID,
      isSocket = true,
    } = req.body;
 

    let updatedChat;
    let theChat;

    const chat = await Chats.findOne({
      participants: { $all: [sender, receiver] },
    });

 

    if (chat) {
      chat.messages.push({
        sender,
        type,
        postID,
        content,
        video: video,
      });
      updatedChat = await chat.save();
      theChat = await Chats.findById(updatedChat._id).populate("participants");
 
    } else {
      const newChat = new Chats({
        participants: [sender, receiver],
        roomID,
        messages: [
          {
            sender,
            type,
            postID,
            video,
            content: JSON.stringify(content),
          },
        ],
      });
      newChat.populate("participants");
      updatedChat = await newChat.save();

      theChat = await Chats.findById(updatedChat._id).populate("participants");

 
    }

    if (isSocket) {
      if (chat || updatedChat) {
        return chat || updatedChat; // Returning chat if it exists or updatedChat if it's a new chat
      }
    }

    return res
      .status(201)
      .json({ message: "Chat message created", data: theChat });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create chat message" });
  }
};

// Get all chats for a user
exports.getUserMessages = async (req, res) => {
  try {
    const { userID } = req.body; // Assuming userID is passed in the request params

    // Find all chats where the user's ID exists in the participants array
    const userChats = await Chats.find({ participants: userID })
      .populate("participants") // Populate participants with specified fields
      .populate("messages.sender") // Populate sender in messages with specified fields
      .populate({
        path: "messages",
        populate: {
          path: "postID",
          populate: {
            path: "userID",
            model: "Users",
            select: "name username profilePicture",
          },
        },
      })
      .exec();

    // Populate sender in messages with specified fields

    return res.status(200).json({ data: userChats });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to fetch user messages", message: error.message });
  }
};

// module.exports = {
//   startChatSession,
// };
