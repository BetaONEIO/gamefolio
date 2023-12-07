const Posts = require("../models/Posts.js");
const socket = require("../utils/socket.js");
const { app } = require("../index.js");

const server = require("http").createServer(app);

// Create a new post
const startChatSession = async (req, res) => {
  // Set up Socket.IO
  try {
    socket.init(server);
    res.status(200).json({ message: "Socket.io is running" });
  } catch (error) {
    res.status(401).json({ error });
    // console.log(error);
  }
};

// Create a new chat message
// const createChatMessage = async (req, res) => {
//   try {
//     const {
//       sender,
//       ticketId,
//       clientId,
//       ticketDetails,
//       receiver,
//       content,
//       isSocket,
//     } = req.body;
//     console.log("chatController: ", {
//       sender,
//       ticketId,
//       clientId,
//       ticketDetails,
//       receiver,
//       content,
//       isSocket,
//     });

//     console.log("TICKET ID: ", ticketId);

//     const chat = await Chat.findOne({
//       ticket: ticketId,
//       // participants: {
//       //   $all: [sender, receiver],
//       // },
//     });

//     console.log("chat: server ", chat);

//     let updatedChat;

//     if (chat) {
//       chat.messages.push({
//         sender,
//         receiver,
//         content,
//       });
//       // return res.status(500).json({ error: "Can't create same ticket again" });
//       console.log("updated chat:  ", chat);
//       return chat;
//     } else {
//       const newChat = new Chat({
//         participants: [clientId],
//         ticket: ticketId,
//         messages: [
//           {
//             sender: clientId,
//             // receiver,
//             content: JSON.stringify(ticketDetails),
//           },
//         ],
//       });
//       updatedChat = await newChat.save();
//     }
//     console.log("CHAT: ", updatedChat);

//     if (isSocket) {
//       return chat;
//     }
//     return res.status(201).json(updatedChat);
//   } catch (error) {
//     return res.status(500).json({ error: "Failed to create chat message" });
//   }
// };

// // Get all chat messages between two users
// exports.getChatMessages = async (req, res) => {
//   try {
//     const { sender, receiver, ticketId } = req.body;
//     console.log("sender: ", sender, " receiver: ", receiver);

//     // const chat = await Chat.findOne({
//     //   participants: {
//     //     $all: [sender, receiver],
//     //   },
//     // });
//     const chat = await Chat.findOne({
//       ticket: ticketId,
//     }).populate("ticket");
//     // const chat = await Chat.findOne({
//     //   participants: sender,
//     // });

//     if (!chat) {
//       return res.status(404).json({ error: "Chats not found" });
//     }
//     // console.log("chat msgs; server controller: ", chat);

//     res.json(chat);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to get chat messages" });
//   }
// };

// // Update participants in chat message
// exports.updateParticipant = async (req, res) => {
//   try {
//     const { ticketId } = req.params;
//     console.log("req.body og updateParticipant: ", req.body);

//     console.log("__", req.body, ticketId);
//     const chat = await Chat.findByIdAndUpdate(
//       ticketId,
//       { $addToSet: { participants: req.body.membId } },
//       { new: true }
//     );

//     if (!chat) {
//       return res.status(404).json({ error: "Ticket not found" });
//     }

//     res.json(chat);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Failed to update ticket" });
//   }
// };

// // Update a chat message
// exports.updateChatMessage = async (req, res) => {
//   try {
//     const { chatId, messageId, content } = req.body;

//     const chat = await Chat.findById(chatId);

//     if (!chat) {
//       return res.status(404).json({ error: "Chat not found" });
//     }

//     const message = chat.messages.id(messageId);

//     if (!message) {
//       return res.status(404).json({ error: "Message not found" });
//     }

//     message.content = content;
//     await chat.save();

//     res.json(chat);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update chat message" });
//   }
// };

// // Delete a chat message
// exports.deleteChatMessage = async (req, res) => {
//   try {
//     const { chatId, messageId } = req.body;

//     const chat = await Chat.findById(chatId);

//     if (!chat) {
//       return res.status(404).json({ error: "Chat not found" });
//     }

//     const message = chat.messages.id(messageId);

//     if (!message) {
//       return res.status(404).json({ error: "Message not found" });
//     }

//     message.remove();
//     await chat.save();

//     res.json(chat);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete chat message" });
//   }
// };

module.exports = {
  startChatSession,
};
