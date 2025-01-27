// import Gameboard from "./gameBoard";
import shipStaticBoard from "./functions/shipsToPlace";
import Player from "./player";
import "./style.css";

const content = document.querySelector(".content");
const test = document.createElement("h1");
test.textContent = "This is a test";
content.appendChild(test);
const playArea = document.createElement("div");
playArea.className = "play-area";
content.appendChild(playArea);
const boardContainer = document.createElement("div");
boardContainer.className = "board-container";
playArea.appendChild(boardContainer);

let player1 = new Player(true);

function numberToAlphabetLetter(value) {
  return (value + 10).toString(36).toUpperCase();
}

function renderBoard() {
  for (const rowKey in player1.gameBoard.board) {
    const row = player1.gameBoard.board[rowKey];
    const rowDiv = document.createElement("div");
    rowDiv.className = "row";
    boardContainer.appendChild(rowDiv);

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

function deployShip(coordinate) {
  ev.target.id;
  player1.placeShip(1, coordinate);
}

const deployButton = document.querySelector(".deploy-button");
deployButton.addEventListener("click", deployShip);

console.log(player1.gameBoard);
// player.gameBoard.placeShip(3, [3, 5], true);
// player.gameBoard.receiveAttack("c", 5);
// player.gameBoard.receiveAttack("c", 5);
// player.gameBoard.receiveAttack("a", 5);
// console.log(player.gameBoard);
