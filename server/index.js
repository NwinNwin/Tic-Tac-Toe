const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //socket is each user (socket has many info)
  console.log(`User Connected : ${socket.id}`);

  //pass room id from front-end
  //"join_room" is used in line 14 in the front-end (App)
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room : ${data}`);
  });

  socket.on("send_game", (data) => {
    socket.to(data.room).emit("receive_game", data);
    console.log(data);
  });

  //when user disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING 3001");
});
