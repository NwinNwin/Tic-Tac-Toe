import React, { useState } from "react";
import { useEffect } from "react";
import { checkWin, checkTie } from "../utils";

//TODO:
// - make it look pretty

export default function Game() {
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

  //[0, 0, 0]
  //[0, 0, 0]
  //[0, 0, 0]
  //Empty: 0
  //X: 1
  //O: 2

  useEffect(() => {
    setWin(checkWin(game));
    setTie(checkTie(game, win));
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
  }

  //render value in each box
  const renderBoard = game.map((ele) => (
    <div
      className="box"
      onClick={() => {
        if (!win[0] && !tie) {
          handleBoxClick(ele.id);
        }
      }}
    >
      <h1>{ele.value}</h1>
    </div>
  ));

  return (
    <div className="game-container">
      {win[0] && <h1>{win[1]} WIN</h1>}
      {tie && <h1>TIE</h1>}
      {console.log(tie)}
      <div className="board">{renderBoard}</div>
      <button onClick={restartGame} className="restart-btn">
        Restart
      </button>
    </div>
  );
}
