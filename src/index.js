// import Gameboard from "./gameBoard";
import shipStaticBoard from "./functions/shipsToPlace";
import Player from "./player";
import "./style.css";

const content = document.querySelector(".content");

const test = document.createElement("h1");
test.textContent = "This is a test";

content.appendChild(test);

let player1 = new Player(true);

function numberToAlphabetLetter(value) {
  return (value + 10).toString(36).toUpperCase();
}

function renderBoard() {
  for (const rowKey in player1.gameBoard.board) {
    const row = player1.gameBoard.board[rowKey];
    const rowDiv = document.createElement("div");
    rowDiv.className = "row";
    content.appendChild(rowDiv);

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const cellDiv = document.createElement("div");
      cellDiv.className = `cell`;
      //   cellDiv.textContent = "";
      cellDiv.dataset.row = rowKey;
      cellDiv.dataset.column = numberToAlphabetLetter(columnIndex);

      // Add click event for interaction
      cellDiv.addEventListener("click", () => {
        let y = cellDiv.dataset.column;
        let x = cellDiv.dataset.row;
        return console.log(y, x);
      });

      rowDiv.appendChild(cellDiv);
    }
  }
}

renderBoard();
shipStaticBoard();

console.log(player1.gameBoard);
// player.gameBoard.placeShip(3, [3, 5], true);
// player.gameBoard.receiveAttack("c", 5);
// player.gameBoard.receiveAttack("c", 5);
// player.gameBoard.receiveAttack("a", 5);
// console.log(player.gameBoard);
