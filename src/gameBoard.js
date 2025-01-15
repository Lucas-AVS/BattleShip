const Ship = require("./ship");
const { v4: uuidv4 } = require("uuid");

class Gameboard {
  constructor() {
    this.board = this.createBoard(10, 10);
  }

  createBoard(x, y) {
    let board = {};
    if (typeof x === "number" && typeof y === "number") {
      for (let j = 1; j <= y; j++) {
        let row = [];
        for (let i = 0; i < x; i++) {
          row.push([]); // columns
        }
        board[j] = row; // rows
      }
      return board;
    }
  }

  //Index at placeShip and other functions always starts at 1 / standardized index at 1
  placeShip(shipLength, coordinate, isVertical = false) {
    let yAxis = coordinate[0];
    let xAxis = coordinate[1] - 1;
    let currentShip = new Ship(shipLength, uuidv4());

    if (isVertical) {
      if (yAxis + shipLength > Object.keys(this.board).length) {
        return "ship does not fit this coordinate";
      }

      for (let i = 0; i < shipLength; i++) {
        if (this.board[yAxis + i][xAxis].length !== 0) {
          return "there is already a ship in this area";
        } else {
          this.board[yAxis + i][xAxis] = currentShip;
        }
      }
    }

    if (!isVertical) {
      // Checks if the ship fits in coordinates
      if (xAxis + shipLength > this.board[yAxis].length && !isVertical) {
        return "ship does not fit this coordinate";
      }

      // Check if there is already have a ship in coordinates
      for (let i = 0; i < shipLength; i++) {
        if (this.board[yAxis][xAxis + i].length !== 0) {
          return "there is already a ship in this area";
        } else {
          this.board[yAxis][xAxis + i] = currentShip;
        }
      }
    }
  }

  findShip(y, x) {
    const yPositionToValue = y.charCodeAt(0) - 96; // 'a' -> index 1, 'b' -> index 2, etc.
    const xPosition = x - 1; // Adjust to internal index (0-based)

    if (
      !this.board[yPositionToValue] ||
      !this.board[yPositionToValue][xPosition] ||
      this.board[yPositionToValue][xPosition].length === 0
    ) {
      this.board[yPositionToValue][xPosition] = "Miss";
      return `there is no ship at current coordinate`;
    } else {
      return this.board[yPositionToValue][xPosition].id;
    }
  }

  // report whether or not all ships have been sunk.
  boardSunk() {
    let shipsLeft = 0;
    let shipId = [];
    let checkedShip = false;
    for (const rowKey in this.board) {
      const row = this.board[rowKey];
      for (const ship of row) {
        // check if ship has an id
        if (ship.id) {
          // check if ship was already checked
          shipId.forEach((id) => {
            id === ship.id ? (checkedShip = true) : (checkedShip = false);
          });
          if (checkedShip) {
            // console.log("Ship already checked");
          } else if (!ship.isSunk()) {
            checkedShip = false;
            shipId.push(ship.id);
            shipsLeft++;
          }
        }
      }
    }
    return shipsLeft > 0 ? false : true;
  }

  hitIdShip(id) {
    for (const rowKey in this.board) {
      const row = this.board[rowKey];
      for (const ship of row) {
        if (ship.id === id) {
          ship.hit();
          // IMPORTANT NOTE:
          // All board positions representing parts of the same ship share the same instance of the "Ship" object.
          // Changes to one position (e.g., a hit) affect all positions linked to that ship.
          if (ship.isSunk()) {
            return this.boardSunk()
              ? "All ships have been sunk!"
              : "You sank the ship!";
          }
          return ship.isSunk() ? this.boardSunk() : "you hit a ship!";
        }
      }
    }
  }

  receiveAttack(y, x) {
    if (this.findShip(y, x) == `there is no ship at current coordinate`) {
      return "you missed!";
    } else {
      return this.hitIdShip(this.findShip(y, x));
    }
  }
}

let gameBoard = new Gameboard();
let ship = new Ship();
console.log(gameBoard.board);
gameBoard.placeShip(3, [3, 5], true);

console.log(gameBoard.findShip("c", 5));

console.log(gameBoard.receiveAttack("a", 1));
console.log(gameBoard.board);
module.exports = Gameboard;
