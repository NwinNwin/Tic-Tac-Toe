import React from "react";
import online from "../images/online.svg";
import offline from "../images/offline.svg";

export default function Home({ setMultiplayerPopUp, setOfflineGame }) {
  return (
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
  );
}
