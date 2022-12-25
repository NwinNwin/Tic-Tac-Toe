//return [ result (true or false), player ("X" or "O")]
function checkWin(game) {
  for (let i = 0; i < 3; i++) {
    //check horizontal
    if (game[0 + 3 * i].value !== "" && game[0 + 3 * i].value === game[1 + 3 * i].value && game[1 + 3 * i].value === game[2 + 3 * i].value) {
      console.log("1");
      console.log(`${game[0 + 3 * i].value} ${game[0 + 3 * i].value} ${game[2 + 3 * i].value}`);
      console.log(`${0 + 3 * i} ${1 + 3 * i} ${2 + 3 * i}`);
      return [
        [true, game[0 + 3 * i].value],
        [0 + 3 * i, 1 + 3 * i, 2 + 3 * i],
      ];
    }
    //check vertical
    else if (game[0 + i].value !== "" && game[0 + i].value === game[3 + i].value && game[3 + i].value === game[6 + i].value) {
      console.log("2");
      return [
        [true, game[0 + i].value],
        [0 + i, 3 + i, 6 + i],
      ];
    }

    //check diagonal left-right
    else if (game[0].value !== "" && game[0].value === game[4].value && game[4].value === game[8].value) {
      console.log("3");
      return [
        [true, game[0].value],
        [0, 4, 8],
      ];
    }

    //check diagonal right-left
    else if (game[2].value !== "" && game[2].value === game[4].value && game[4].value === game[6].value) {
      console.log("4");
      return [
        [true, game[2].value],
        [2, 4, 6],
      ];
    }
  }
  return [false, ""];
}

function checkTie(game, win) {
  if (!win[0]) {
    for (let i of game) {
      if (i.value === "") {
        return false;
      }
    }
    return true;
  }
  return false;
}

export { checkWin, checkTie };
