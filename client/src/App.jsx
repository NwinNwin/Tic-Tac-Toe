import "./App.css";
import Game from "./components/Game";
import MultiplayerGame from "./components/MutiplayerGame";
import MultiplayerLogin from "./components/MultiplayerLogin";
import Home from "./components/Home";
import io from "socket.io-client";
import { useState } from "react";
import BotGame from "./components/BotGame";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [ShowMultiplayerGame, setShowMultiplayerGame] = useState(false);
  const [MultiplayerPopUp, setMultiplayerPopUp] = useState(false);
  const [offlineGame, setOfflineGame] = useState(false);
  const [botGame, setBotGame] = useState(false);

  const joinRoom = () => {
    //only allow users who have name and room id to join
    if (username !== "" && room !== "") {
      socket.emit("join_room", { room: room, username: username });
      setShowMultiplayerGame(true);
      setMultiplayerPopUp(false);
    }
  };
  return (
    <div className="App">
      <main>
        {!ShowMultiplayerGame && !MultiplayerPopUp && !offlineGame && !botGame && <Home setMultiplayerPopUp={setMultiplayerPopUp} setOfflineGame={setOfflineGame} setBotGame={setBotGame} />}

        <MultiplayerLogin trigger={MultiplayerPopUp} joinRoom={joinRoom} setUsername={setUsername} setRoom={setRoom} setMultiplayerPopUp={setMultiplayerPopUp} />
        {ShowMultiplayerGame && <MultiplayerGame socket={socket} username={username} room={room} setShowMultiplayerGame={setShowMultiplayerGame} />}
        {offlineGame && <Game setOfflineGame={setOfflineGame} />}
        {botGame && <BotGame setBotGame={setBotGame} />}
      </main>
    </div>
  );
}

export default App;
