import React from "react";
import online from "../images/online.svg";
import offline from "../images/offline.svg";
import robot from "../images/robot.svg";

export default function Home({ setMultiplayerPopUp, setOfflineGame, setBotGame }) {
  return (
    <>
      <div className="title">
        <h1 className="title-1">Tic-tac-toe +</h1>
      </div>
      <div className="home">
        {/*Multiplayer Game Button */}

        <div
          onClick={() => {
            setMultiplayerPopUp(true);
          }}
          className="home-btn"
          title="Online Game"
        >
          <img src={online} alt="" className="home-btn-img" />
          <h3>With Friends</h3>
        </div>

        {/* Bot Game Button */}
        <div
          onClick={() => {
            setBotGame(true);
          }}
          className="home-btn"
          title="Bot Game"
        >
          <img src={robot} alt="" className="home-btn-img" />
          <h3>AI</h3>
        </div>

        {/*Offline Game Button */}
        <div
          onClick={() => {
            setOfflineGame(true);
          }}
          className="home-btn"
          title="Offline Game"
        >
          <img src={offline} alt="" className="home-btn-img" />
          <h3>Offline</h3>
        </div>
      </div>
    </>
  );
}
