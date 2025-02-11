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
      cellDiv.addEventListener("click", () => {
        deployShip(y, x);
      });

      rowDiv.appendChild(cellDiv);
    }
  }
}

let shipQuantities = {
  boat: 5,
  submarine: 3,
  warship: 2,
  destroyer: 1,
};

renderBoard();
shipsToPlace(
  shipQuantities.boat,
  shipQuantities.submarine,
  shipQuantities.warship,
  shipQuantities.destroyer
);

function currentOrientation() {
  let orientation = document.querySelector(".to-place-container");
  if (orientation.id === "vertical") {
    return true;
  } else return false;
}

function displayShip(y, x, vertical = false) {
  let currentShip = document.querySelector(".to-place-container");
  let shipSize = Number(currentShip.dataset.selectedShipHp);

  if (!vertical) {
    for (let i = 0; i < shipSize; i++) {
      let currentDiv = document.querySelector(
        `[data-row="${y}"][data-column="${x + i}"]`
      );
      currentDiv.id = "deployed";
    }
  }
  if (vertical) {
    for (let i = 0; i < shipSize; i++) {
      let currentDiv = document.querySelector(
        `[data-row="${y + i}"][data-column="${x}"]`
      );
      currentDiv.id = "deployed";
    }
  }
  // <div class="cell" data-row="b" data-column="9"></div>
}

function deployShip(y, x) {
  let currentShip = document.querySelector(".to-place-container");
  let shipSize = Number(currentShip.dataset.selectedShipHp);

  if (!shipSize || shipSize === "disabled") {
    alert("Please select a valid ship to place.");
    return;
  }

  console.log("Deploying ship at:", y, x);
  let result = player1.gameBoard.placeShip(shipSize, [y, x]);

  if (
    result === "invalid position" ||
    result === "ship does not fit this coordinate" ||
    result === "there is already a ship in this area"
  ) {
    alert(result);
    return;
  } else {
    displayShip(y, x);
  }

  console.log(player1.gameBoard);

  switch (shipSize) {
    case 1:
      shipQuantities.boat--;
      break;
    case 2:
      shipQuantities.submarine--;
      break;
    case 3:
      shipQuantities.warship--;
      break;
    case 4:
      shipQuantities.destroyer--;
      break;
  }

  // Refresh shipsToPlace UI with the new ships quantity
  currentShip.dataset.selectedShipHp = "";
  shipsToPlace(
    shipQuantities.boat,
    shipQuantities.submarine,
    shipQuantities.warship,
    shipQuantities.destroyer,
    currentOrientation()
  );
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
