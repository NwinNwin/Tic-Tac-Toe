import "./App.css";
import Game from "./components/Game";
import MultiplayerGame from "./components/MutiplayerGame";
import MultiplayerLogin from "./components/MultiplayerLogin";
import io from "socket.io-client";
import { useState } from "react";
import offline from "./images/offline.svg";
import online from "./images/online.svg";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [ShowMultiplayerGame, setShowMultiplayerGame] = useState(false);
  const [MultiplayerPopUp, setMultiplayerPopUp] = useState(false);
  const [offlineGame, setOfflineGame] = useState(false);

  const joinRoom = () => {
    //only allow users who have name and room id to join
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowMultiplayerGame(true);
      setMultiplayerPopUp(false);
    }
  };
  return (
    <div className="App">
      <main>
        {!ShowMultiplayerGame && !MultiplayerPopUp && !offlineGame && (
          <div className="home">
            {/*Multiplayer Game Button */}
            <div
              onClick={() => {
                setMultiplayerPopUp(true);
              }}
              className="home-btn"
              title="Online"
            >
              <img src={online} alt="" className="home-btn-img" />
            </div>
            {/*Offline Game Button */}
            <div
              onClick={() => {
                setOfflineGame(true);
              }}
              className="home-btn"
              title="Offline"
            >
              <img src={offline} alt="" className="home-btn-img" />
            </div>
          </div>
        )}

        <MultiplayerLogin trigger={MultiplayerPopUp} joinRoom={joinRoom} setUsername={setUsername} setRoom={setRoom} setMultiplayerPopUp={setMultiplayerPopUp} />
        {ShowMultiplayerGame && <MultiplayerGame socket={socket} username={username} room={room} setShowMultiplayerGame={setShowMultiplayerGame} />}
        {offlineGame && <Game setOfflineGame={setOfflineGame} />}
      </main>
    </div>
  );
}

export default App;
