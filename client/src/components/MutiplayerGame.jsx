import React, { useState } from "react";
import { useEffect } from "react";
import { checkWin, checkTie } from "../utils";
import x from "../images/x.svg";
import o from "../images/o.svg";
import restart from "../images/restart.svg";
import exit from "../images/exit.svg";
import Chat from "./Chat";
import chat_logo from "../images/chat_logo.svg";
import arrow_up from "../images/no_chat.svg";

export default function MultiplayerGame({ socket, username, room, setShowMultiplayerGame }) {
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
  const [sendingTurn, setSendingTurn] = useState("X");
  const [allowMove, setAllowMove] = useState(true);
  const [player, setPlayer] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [yourScore, setYourScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [userLeft, setUserLeft] = useState("");

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
    setSendingTurn((prev) => (prev === "X" ? "O" : "X"));
    setAllowMove(false);

    //send game, turn to other player
    // await socket.emit("send_game", { game: game, turn: turn, room: room });
  }

  async function sendGame() {
    await socket.emit("send_game", { game: game, turn: turn, room: room, username: username });
  }

  //restart game
  function restartGame() {
    setGame((prev) => prev.map((box) => ({ ...box, value: "" })));
    setTurn("X");
    setWin([false, ""]);
    setTie(false);
    setWinningBoxes([]);
    setSendingTurn("X");
  }

  useEffect(() => {
    sendGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendingTurn]);

  //receive the game when opponent make move
  useEffect(() => {
    const eventListener = (data) => {
      setGame(data.game);
      setTurn(data.turn);
      setAllowMove(true);
      setPlayer(data.username);
    };
    socket.on("receive_game", eventListener);
    return () => socket.off("receive_game", eventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  //change state when opponent left the room
  useEffect(() => {
    const eventListener = (data) => {
      setUserLeft(data);
    };
    socket.on("user_left", eventListener);
    return () => socket.off("user_left", eventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    const eventListener = (data) => {
      setUserLeft("");
      setPlayer(data);
    };
    socket.on("user_joined", eventListener);
    return () => socket.off("user_joined", eventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  //keep score
  useEffect(() => {
    if (win[0] && !allowMove) {
      setYourScore((prev) => prev + 1);
    } else if (win[0] && allowMove) {
      setOtherScore((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win[0]]);

  //render value in each box
  const renderBoard = game.map((ele) => (
    <div
      className={winningBoxes.includes(ele.id) ? "box winning-box" : "box"}
      onClick={() => {
        if (!win[0] && !tie && ele.value === "" && allowMove) {
          handleBoxClick(ele.id);
        }
      }}
    >
      {ele.value === "O" ? <img className="x-or-o" src={o} alt="alt" width="100%" /> : ele.value === "X" ? <img className="x-or-o" src={x} width="70%" height="70%" alt="alt" /> : ele.value}
    </div>
  ));

  return (
    <div className="multiplayer">
      <div className="result-container">
        <h1>{win[0] && !allowMove ? `GG EZ!` : win[0] && allowMove ? "lmao L!" : ""}</h1>
        <h1>{tie && !win[0] ? "TIE" : ""}</h1>
        <h1>{!tie && !win[0] && !allowMove && player !== "" ? `${player} 's turn` : !tie && !win[0] && !allowMove && player === "" ? "Waiting for other player..." : ""}</h1>
        <h1>{userLeft !== "" && `${userLeft} left`}</h1>
      </div>
      <div className="game-container">
        <div className="board">{renderBoard}</div>
        <button onClick={restartGame} className="restart-btn">
          <img className="restart-logo" src={restart} alt="" />
        </button>
      </div>
      <div className="score-bar">
        <h1 className="score-player">{username}</h1>
        <h2 className="score-number">{yourScore}</h2>
        <div className="score-line"></div>
        <h2 className="score-number">{otherScore}</h2>
        <h1 className="score-player">{player !== "" ? player : "player 2"}</h1>
      </div>
      <div className="tool-bar">
        {" "}
        <button
          className="exit-btn"
          onClick={() => {
            setShowMultiplayerGame(false);
            socket.emit("leave_room", { room: room, username: username });
          }}
        >
          <img className="restart-logo" src={exit} alt="" />
        </button>
        <button className="chat-btn">
          {openChat ? (
            <img
              onClick={() => {
                setOpenChat((prev) => !prev);
              }}
              className="restart-logo"
              src={chat_logo}
              alt="alt"
            />
          ) : (
            <img
              onClick={() => {
                setOpenChat((prev) => !prev);
              }}
              className="restart-logo"
              src={arrow_up}
              alt="alt"
            />
          )}
        </button>
        <div className={openChat && "hide"}>
          <Chat userLeft={userLeft} socket={socket} room={room} username={username} />
        </div>
      </div>
    </div>
  );
}
