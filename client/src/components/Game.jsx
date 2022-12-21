import React, { useState } from "react";

export default function Game() {
  const [game, setGame] = useState([
    { id: 0, value: 0 },
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 },
    { id: 5, value: 0 },
    { id: 6, value: 0 },
    { id: 7, value: 0 },
    { id: 8, value: 0 },
  ]);
  const [turn, setTurn] = useState(1);

  //[0, 0, 0]
  //[0, 0, 0]
  //[0, 0, 0]
  //Empty: 0
  //X: 1
  //O: 2

  //when each box get clicked (set box to that value, switch turn)
  function handleBoxClick(id) {
    setGame((prev) => prev.map((box) => (box.id === id && box.value == 0 ? { ...box, value: turn } : box)));
    setTurn((prev) => (prev == 1 ? 2 : 1));
  }

  //restart game
  function restartGame() {
    setGame((prev) => prev.map((box) => ({ ...box, value: 0 })));
    setTurn(1);
  }

  const renderBoard = game.map((ele) => (
    <div
      className="box"
      onClick={() => {
        handleBoxClick(ele.id);
      }}
    >
      <h1>{ele.value}</h1>
    </div>
  ));

  return (
    <div className="game-container">
      <div className="board">{renderBoard}</div>
      <button onClick={restartGame} className="restart-btn">
        Restart
      </button>
    </div>
  );
}
