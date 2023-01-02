import React from "react";
import easy from "../images/easy.svg";
import hard from "../images/hard.svg";
import impossible from "../images/impossible.svg";
import x from "../images/x.svg";
import o from "../images/o.svg";

export default function BotGamePopUp(props) {
  return props.trigger ? (
    <div className="bot-game-pop-up">
      <h1>AI's Setting</h1>

      <h2>Difficulty</h2>
      <div className="bot-mode-container">
        {/* EASY MODE */}
        <div
          className={`bot-mode ${props.botLevel === 1 && "bot-chosen"}`}
          onClick={() => {
            props.setBotLevel(1);
            props.restartGame();
          }}
        >
          <img src={easy} alt="" />
          <h1>Easy</h1>
        </div>

        {/* HARD MODE */}
        <div
          className={`bot-mode ${props.botLevel === 4 && "bot-chosen"}`}
          onClick={() => {
            props.setBotLevel(4);
            props.restartGame();
          }}
        >
          <img src={hard} alt="" />
          <h1>Hard</h1>
        </div>

        {/* IMPOSSIBLE MODE */}
        <div
          className={`bot-mode ${props.botLevel === 100 && "bot-chosen"}`}
          onClick={() => {
            props.setBotLevel(100);
            props.restartGame();
          }}
        >
          <img src={impossible} alt="" />
          <h1>Impossible</h1>
        </div>
      </div>

      <h2>Move</h2>

      <div className="bot-game-x-or-o">
        <div
          className={props.aiX_O === "X" ? "bot-chosen" : ""}
          onClick={() => {
            props.setAiX_O("X");
            props.restartGame();
            props.setAiTurn(true);
          }}
        >
          <img src={x} alt="" />
        </div>
        <div
          className={props.aiX_O === "O" ? "bot-chosen" : ""}
          onClick={() => {
            props.setAiX_O("O");
            props.restartGame();
            props.setAiTurn(false);
          }}
        >
          <img src={o} alt="" />
        </div>
      </div>

      <button
        className="bot-close-btn"
        onClick={() => {
          props.setShowPopUp(false);
        }}
      >
        <p>close</p>
      </button>
    </div>
  ) : (
    ""
  );
}
