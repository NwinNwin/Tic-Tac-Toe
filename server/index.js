const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://tic-tac-toe-plus.vercel.app/",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //socket is each user (socket has many info)
  console.log(`User Connected : ${socket.id}`);

  //pass room id from front-end
  //"join_room" is used in line 14 in the front-end (App)
  socket.on("join_room", ({ room, username }) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room : ${room}`);
    socket.to(room).emit("user_joined", username);
  });

  socket.on("leave_room", ({ room, username }) => {
    socket.leave(room);
    console.log(`User with ID: ${username} left room : ${room}`);
    socket.to(room).emit("user_left", username);
  });

  socket.on("send_game", (data) => {
    socket.to(data.room).emit("receive_game", data);
    console.log(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });

  //when user disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log("SERVER RUNNING 3001");
});
