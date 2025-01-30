// import Gameboard from "./gameBoard";
import shipsToPlace from "./functions/shipsToPlace";
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
  return (Number(value) + 9).toString(36);
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
      cellDiv.dataset.row = numberToAlphabetLetter(rowKey);
      cellDiv.dataset.column = columnIndex + 1;

      // Add click event for interaction
      let y = cellDiv.dataset.row;
      let x = Number(cellDiv.dataset.column);
      cellDiv.addEventListener("click", () => deployShip(y, x));

      rowDiv.appendChild(cellDiv);
    }
  }
}

renderBoard();
shipsToPlace();

function deployShip(y, x) {
  let currentShip = document.querySelector(".to-place-container");
  let shipSize = Number(currentShip.id);

  console.log("Deploying ship at:", y, x);

  player1.gameBoard.placeShip(shipSize, [y, x]);

  console.log(player1.gameBoard);
}

// const deployButton = document.querySelector(".deploy-button");
// deployButton.addEventListener("click", () => deployShip);

// console.log(player1.gameBoard);
// player1.gameBoard.placeShip(3, ["c", 5], true);

// console.log(player1.gameBoard);
// player.gameBoard.receiveAttack("c", 5);
// player.gameBoard.receiveAttack("c", 5);
// player.gameBoard.receiveAttack("a", 5);
// console.log(player.gameBoard);
