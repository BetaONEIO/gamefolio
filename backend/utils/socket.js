const socketIO = require("socket.io");
const chatController = require("../controller/chatController");

let io;

function init(server) {
  io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A new user connected ");

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    socket.on("sendMessage", async (data) => {
      const { roomID, sender, receiver, content } = data;
      console.log("Data: ", data);

      // Create an save the chat using the createChatMessage controller
      const chat = await chatController.createChatMessage({
        body: {
          roomID,
          sender,
          receiver,
          content,
          isSocket: true,
        },
      });
      await chat.save();

      // Emit the message to the sender and receiver
      console.log("ChatID: on socket server ", chat._id);

      // Send the message to all clients in the room
      io.to(roomID).emit("newMessage", { sender, receiver, content });
    });

    // Listening when user is typing
    socket.on("userTyping", async (data) => {
      console.log("user typing data: ", data);
      io.to("123").emit("userIsTyping", {
        userWhichIsTyping: data.userWhichIsTyping,
        // typing: data.userisTyping,
      });
    });
    // Listening when user stopped typing
    socket.on("userNotTyping", async (data) => {
      console.log("user typing data: ", data);
      io.to("123").emit("userIsNotTyping", {
        userWhichIsTyping: data.userWhichIsTyping,
      });
    });

    // Listening to acknowledgement message (handshake)
    socket.on("userAcknowledgeMsgReceived", async (data) => {
      console.log("Msg received acknowledge: ", data);
    });

    // Listening if user is disconnected
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  // Socket server
  const port = process.env.SOCKET_PORT;
  console.log("S PORT: ", port);
  server.listen(8000, () => {
    console.log(`Socket Servers running on http://localhost:${8000}`);
  });
}

module.exports = {
  init,
  io,
};
