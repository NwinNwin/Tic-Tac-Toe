import { checkTie, checkWin } from "./utils";

//AI Move
function aiMove(game, setTurn) {
  let bestScore = Infinity;
  let bestMove;
  for (let gameBox of game) {
    if (gameBox.value === "") {
      game[gameBox.id] = { ...game[gameBox.id], value: "O" };
      let score = minimax(game, 0, true);
      game[gameBox.id] = { ...game[gameBox.id], value: "" };
      if (score < bestScore) {
        bestScore = score;
        bestMove = gameBox.id;
      }
    }
  }
  game[bestMove] = { ...game[bestMove], value: "O" };
  setTurn((prev) => (prev === "X" ? "O" : "X"));
}

function minimax(game, depth, isMaximizing) {
  let winResult = checkWin(game)[0];
  let tieResult = checkTie(game, winResult[0]);
  if (winResult[0]) {
    return winResult[1] == "X" ? 1 : -1;
  }
  if (tieResult) {
    return 0;
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove;
    for (let gameBox of game) {
      if (gameBox.value === "") {
        game[gameBox.id] = { ...game[gameBox.id], value: "X" };
        let score = minimax(game, depth + 1, false);
        game[gameBox.id] = { ...game[gameBox.id], value: "" };
        if (score > bestScore) {
          bestScore = score;
          bestMove = gameBox.id;
        }
      }
    }
    return bestScore;
  }
  if (!isMaximizing) {
    let bestScore = Infinity;
    let bestMove;
    for (let gameBox of game) {
      if (gameBox.value === "") {
        game[gameBox.id] = { ...game[gameBox.id], value: "O" };
        let score = minimax(game, depth + 1, true);
        game[gameBox.id] = { ...game[gameBox.id], value: "" };
        if (score < bestScore) {
          bestScore = score;
          bestMove = gameBox.id;
        }
      }
    }
    return bestScore;
  }
}

export { aiMove };
