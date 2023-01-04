import { useState, useEffect } from "react";
import { checkWin, checkTie } from "../utils";
import { aiMove } from "../ai";
import x from "../images/x.svg";
import o from "../images/o.svg";
import restart from "../images/restart.svg";
import exit from "../images/exit.svg";
import BotGamePopUp from "./BotGamePopUp";
import setting from "../images/setting.svg";
import easy from "../images/easy.svg";
import hard from "../images/hard.svg";
import impossible from "../images/impossible.svg";
import robot from "../images/robot.svg";

export default function Game(props) {
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

  //false if O, true if X
  const [aiTurn, setAiTurn] = useState(false);

  const [showPopUp, setShowPopUp] = useState(false);

  //allow player to let AI be X or O
  const [aiX_O, setAiX_O] = useState("O");

  // 1: easy, 4: hard, 100:impossible
  const [botLevel, setBotLevel] = useState(100);

  //keep track of number of moves
  const [numMove, setnumMove] = useState(0);

  //score keeping
  const [yourScore, setYourScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);

  useEffect(() => {
    let winning = checkWin(game);
    setWin(winning[0]);
    setTie(checkTie(game, win));
    setWinningBoxes(winning[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn]);

  //when each box get clicked (set box to that value, switch turn)
  function handleBoxClick(id) {
    setGame((prev) => prev.map((box) => (box.id === id && box.value === "" ? { ...box, value: turn } : box)));
    setTurn((prev) => (prev === "X" ? "O" : "X"));
    setAiTurn(true);
    setnumMove(numMove + 1);
  }

  //Ai moves when its turn
  useEffect(() => {
    if (aiTurn) {
      aiMove(game, setTurn, botLevel, aiX_O, numMove, setnumMove);
      setAiTurn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiTurn]);

  //update Score
  useEffect(() => {
    if (win[0] && win[1] !== aiX_O) {
      setYourScore(yourScore + 1);
    } else if (win[0] && win[1] === aiX_O) {
      setAiScore(aiScore + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win[0]]);

  //restart game
  function restartGame() {
    setGame((prev) => prev.map((box) => ({ ...box, value: "" })));
    setTurn("X");
    setWin([false, ""]);
    setTie(false);
    setWinningBoxes([]);
    setAiTurn(aiX_O === "X" ? true : false);
    setnumMove(0);
  }

  //render value in each box
  const renderBoard = game.map((ele) => (
    <div
      className={winningBoxes.includes(ele.id) ? "box winning-box" : "box"}
      onClick={() => {
        if (turn !== aiX_O && !win[0] && !tie && ele.value === "") {
          handleBoxClick(ele.id);
        }
      }}
    >
      {ele.value === "O" ? <img className="x-or-o" src={o} alt="alt" width="100%" /> : ele.value === "X" ? <img className="x-or-o" src={x} width="70%" height="70%" alt="alt" /> : ele.value}
    </div>
  ));
  console.log(numMove);

  return (
    <div className="game-container">
      <div className="result-container">
        <h1>{win[0] && `${win[1] === aiX_O ? "AI" : "YOU"} WINS!`}</h1>
        <h1>{tie && !win[0] ? "TIE" : ""}</h1>
      </div>

      <div className="board">{renderBoard}</div>
      <button onClick={restartGame} className="restart-btn">
        <img className="restart-logo" src={restart} alt="" />
      </button>

      {/* Score Bar */}
      <div className="score-bar">
        <h1 className="score-player">You</h1>
        <h2 className="score-number">{yourScore}</h2>
        <div className="score-line"></div>
        <h2 className="score-number">{aiScore}</h2>
        <img className="bot-score-icon" src={robot} alt="" />
      </div>

      <div className="tool-bar">
        <button
          className="exit-btn"
          onClick={() => {
            props.setBotGame(false);
          }}
        >
          <img className="restart-logo" src={exit} alt="" />
        </button>

        <button
          className="exit-btn"
          onClick={() => {
            setShowPopUp((prev) => !prev);
          }}
        >
          <img src={setting} className="restart-logo" alt="" />
        </button>
      </div>
      <div className="bot-bar">
        <img className="bot-icon" src={robot} alt="" />
        <div className="bot-bar-line"> </div>

        <img src={botLevel === 1 ? easy : botLevel === 4 ? hard : impossible} alt="" />
        <h1>+</h1>
        <img src={aiX_O === "X" ? x : o} alt="" />
      </div>
      <BotGamePopUp trigger={showPopUp} setShowPopUp={setShowPopUp} setBotLevel={setBotLevel} restartGame={restartGame} botLevel={botLevel} aiX_O={aiX_O} setAiX_O={setAiX_O} setAiTurn={setAiTurn} />
    </div>
  );
}
