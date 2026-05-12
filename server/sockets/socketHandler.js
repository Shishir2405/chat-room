const { v4: uuidv4 } = require("uuid");

const messages = require("../data/message");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket Started and user connected");

    socket.join("general");

    socket.on("message:send", (message) => {
      if (!message?.text || !message?.username) return;

      const newMessage = {
        id: uuidv4(),
        text: message.text,
        username: message.username,
        createdAt: new Date(),
      };

      messages.push(newMessage);

      io.to("general").emit("message:new", newMessage);
    });

    socket.on("typing:start", (username) => {
      socket.broadcast.emit("typing:start", username);
    });

    socket.on("typing:stop", () => {
      socket.broadcast.emit("typing:stop");
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
};

module.exports = socketHandler;
