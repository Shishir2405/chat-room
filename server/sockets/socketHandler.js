const { v4: uuidv4 } = require("uuid");

const messages = require("../data/message");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket Started and user connected");

    socket.join("general");

    socket.on("message:send", (message) => {
      console.log(message);
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
      try {
        socket.brodcast.emit("typing:start", username);
      } catch (err) {
        console.log(`Error ${err}`);
      }
    });

    socket.on("typing:stop", () => {
      try {
        socket.brodcast.emit("typing:stop");
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
};

module.exports = socketHandler;
