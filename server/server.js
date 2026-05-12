const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");

const socketHandler = require("./sockets/socketHandler");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

socketHandler(io);

server.listen(8000, () => {
  console.log("Server running");
});
