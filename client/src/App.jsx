import "./App.css";
import Game from "./components/Game";
import MultiplayerGame from "./components/MutiplayerGame";
import io from "socket.io-client";
import { useState } from "react";

const socket = io.connect("http://localhost:3001");

//TODO:
// - socket.io
// - create home menu
// - finish implemeting 2 player mode
// - keep score between 2 players
// - delete console.log in utils

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showGame, setShowGame] = useState(false);

  const joinRoom = () => {
    //only allow users who have name and room id to join
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowGame(true);
    }
  };
  return (
    <div className="App">
      {!showGame ? (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID ..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      ) : (
        <MultiplayerGame socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
