import React, { useState } from "react";
import { useEffect } from "react";

//TODO:
// - make a function to check if win
// - change 1, 2 to X, O
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

  //[0, 0, 0]
  //[0, 0, 0]
  //[0, 0, 0]
  //Empty: 0
  //X: 1
  //O: 2

  useEffect(() => {
    setWin(checkWin());
  }, [turn]);
  //when each box get clicked (set box to that value, switch turn)
  function handleBoxClick(id) {
    setGame((prev) => prev.map((box) => (box.id === id && box.value === "" ? { ...box, value: turn } : box)));
    setTurn((prev) => (prev === "X" ? "O" : "X"));
    // setWin(checkWin());
  }

  //restart game
  function restartGame() {
    setGame((prev) => prev.map((box) => ({ ...box, value: "" })));
    setTurn("X");
  }

  //return [ result (true or false), player ("X" or "O")]
  function checkWin() {
    for (let i = 0; i < 3; i++) {
      //check horizontal
      if (game[0 + i].value !== "" && game[0 + i].value === game[1 + i].value && game[1 + i].value === game[2 + i].value) {
        return [true, game[0 + i].value];
      }
      //check vertical
      else if (game[0 + i].value !== "" && game[0 + i].value === game[3 + i].value && game[3 + i].value === game[6 + i].value) {
        return [true, game[0 + i].value];
      }

      //check diagonal left-right
      else if (game[0].value !== "" && game[0].value === game[4].value && game[4].value === game[8].value) {
        return [true, game[0].value];
      }

      //check diagonal right-left
      else if (game[2].value !== "" && game[2].value === game[4].value && game[4].value === game[6].value) {
        return [true, game[2].value];
      }
    }
    return [false, ""];
  }
  console.log(win);

  //render value in each box
  const renderBoard = game.map((ele) => (
    <div
      className="box"
      onClick={() => {
        handleBoxClick(ele.id);
      }}
    >
      <h1>{ele.value}</h1>
      {win[0] && <h1>WIN</h1>}
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
