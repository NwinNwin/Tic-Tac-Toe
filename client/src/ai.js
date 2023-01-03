import { checkTie, checkWin } from "./utils";

//AI Move
function aiMove(game, setTurn, level, aiX_O, numMove, setnumMove) {
  let bestMove;

  if (aiX_O === "X" && numMove === 0) {
    //make random first move when it is X
    bestMove = Math.floor(Math.random() * 9);
  } else {
    let bestScore = aiX_O === "O" ? Infinity : -Infinity;
    for (let gameBox of game) {
      if (gameBox.value === "") {
        // game[gameBox.id] = { ...game[gameBox.id], value: "O" };
        // let score = minimax(game, level, true);

        game[gameBox.id] = { ...game[gameBox.id], value: aiX_O };
        let score = minimax(game, level, aiX_O === "O" ? true : false);
        game[gameBox.id] = { ...game[gameBox.id], value: "" };
        if (aiX_O === "O" ? score < bestScore : score > bestScore) {
          bestScore = score;
          bestMove = gameBox.id;
        }
      }
    }
  }

  game[bestMove] = { ...game[bestMove], value: aiX_O };

  setnumMove(numMove + 1);
  setTurn((prev) => (prev === "X" ? "O" : "X"));
}

function minimax(game, depth, isMaximizing) {
  let winResult = checkWin(game)[0];
  let tieResult = checkTie(game, winResult[0]);
  if (winResult[0]) {
    return winResult[1] === "X" ? 1 : -1;
  }
  if (tieResult || depth === 0) {
    return 0;
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let gameBox of game) {
      if (gameBox.value === "") {
        game[gameBox.id] = { ...game[gameBox.id], value: "X" };
        let score = minimax(game, depth - 1, false);
        game[gameBox.id] = { ...game[gameBox.id], value: "" };
        if (score > bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  }
  if (!isMaximizing) {
    let bestScore = Infinity;
    for (let gameBox of game) {
      if (gameBox.value === "") {
        game[gameBox.id] = { ...game[gameBox.id], value: "O" };
        let score = minimax(game, depth - 1, true);
        game[gameBox.id] = { ...game[gameBox.id], value: "" };
        if (score < bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  }
}

export { aiMove };
