import React, { useState } from "react";
import { useEffect } from "react";
import { checkWin, checkTie } from "../utils";
import x from "../images/x.svg";
import o from "../images/o.svg";
import restart from "../images/restart.svg";

export default function Game({ socket, username, room }) {
  const [game, setGame] = useState([
    { id: 0, value: "" },
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
    { id: 5, value: "" },
    { id: 6, value: "" },
    { id: 7, value: "" },
    { id: 8, value: "" },
  ]);
  const [turn, setTurn] = useState("X");
  const [win, setWin] = useState([false, ""]);
  const [tie, setTie] = useState(false);
  const [winningBoxes, setWinningBoxes] = useState([]);

  useEffect(() => {
    let winning = checkWin(game);
    setWin(winning[0]);
    setTie(checkTie(game, win));
    setWinningBoxes(winning[1]);
  }, [turn]);

  //when each box get clicked (set box to that value, switch turn)
  function handleBoxClick(id) {
    setGame((prev) => prev.map((box) => (box.id === id && box.value === "" ? { ...box, value: turn } : box)));
    setTurn((prev) => (prev === "X" ? "O" : "X"));
  }

  //restart game
  function restartGame() {
    setGame((prev) => prev.map((box) => ({ ...box, value: "" })));
    setTurn("X");
    setWin([false, ""]);
    setTie(false);
    setWinningBoxes([]);
  }

  //render value in each box
  const renderBoard = game.map((ele) => (
    <div
      className={winningBoxes.includes(ele.id) ? "box winning-box" : "box"}
      onClick={() => {
        if (!win[0] && !tie) {
          handleBoxClick(ele.id);
        }
      }}
    >
      {ele.value === "O" ? <img className="x-or-o" src={o} alt="" width="100%" /> : ele.value === "X" ? <img className="x-or-o" src={x} width="70%" height="70%" /> : ele.value}
    </div>
  ));

  return (
    <div className="game-container">
      <div className="result-container">
        <h1>{win[0] && `${win[1]} WINS!`}</h1>
        <h1>{tie && !win[0] ? "TIE" : ""}</h1>
      </div>

      {console.log(tie)}
      <div className="board">{renderBoard}</div>
      <button onClick={restartGame} className="restart-btn">
        <img className="restart-logo" src={restart} alt="" />
      </button>
    </div>
  );
}
