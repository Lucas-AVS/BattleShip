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
    let yAxis = coordinate[0].charCodeAt(0) - 96;
    let xAxis = coordinate[1] - 1;
    let currentShip = new Ship(shipLength, uuidv4());
    if (yAxis > 10 || xAxis > 9 || yAxis < 1 || xAxis < 0) {
      return "invalid position";
    }

    if (isVertical) {
      // y - 1 because index starts at 1 (h + 3 = 11)
      if (yAxis - 1 + shipLength > Object.keys(this.board).length) {
        console.log(yAxis);
        console.log(Object.keys(this.board).length);
        return "ship does not fit this coordinate";
      }

      if (this.AvailableArea(yAxis, xAxis, shipLength, true)) {
        for (let i = 0; i < shipLength; i++) {
          this.board[yAxis + i][xAxis] = currentShip;
        }
      } else {
        return "there is already a ship in this area";
      }
    }

    if (!isVertical) {
      // Checks if the ship fits in coordinates
      if (xAxis + shipLength > this.board[yAxis].length && !isVertical) {
        return "ship does not fit this coordinate";
      }

      // Check if there is already have a ship in coordinates
      if (this.AvailableArea(yAxis, xAxis, shipLength, false)) {
        for (let i = 0; i < shipLength; i++) {
          this.board[yAxis][xAxis + i] = currentShip;
        }
      } else {
        return "there is already a ship in this area";
      }
    }
  }

  AvailableArea(y, x, shipLength, isVertical) {
    for (let i = 0; i < shipLength; i++) {
      let checkY = isVertical ? y + i : y;
      let checkX = isVertical ? x : x + i;

      if (this.board[checkY]?.[checkX]?.length !== 0) {
        return false;
      }
    }
    return true;
  }

  findShip(y, x) {
    const yPositionToValue = y.charCodeAt(0) - 96; // 'a' -> index 1, 'b' -> index 2, etc.
    const xPosition = x - 1; // Adjust to internal index (0-based)
    if (
      xPosition > 9 || //due to previous internal adjust
      yPositionToValue > 10 ||
      xPosition < 0 || //due to previous internal adjust
      yPositionToValue < 1
    ) {
      return "invalid position";
    }

    if (
      (!this.board[yPositionToValue] ||
        !this.board[yPositionToValue][xPosition] ||
        this.board[yPositionToValue][xPosition].length === 0) &&
      typeof this.board[yPositionToValue][xPosition] === "object"
    ) {
      this.board[yPositionToValue][xPosition] = "Miss";
      return `there is no ship at current coordinate`;
    }
    if (typeof this.board[yPositionToValue][xPosition] === "string") {
      return "Area already chosen!";
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
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const ship = row[columnIndex];
        if (ship.id === id) {
          ship.hit();

          if (ship.isSunk()) {
            if (this.boardSunk()) {
              row[columnIndex] = `sunken ${row[columnIndex].name}`;
              return "All ships have been sunk!";
            } else {
              return "You sank the ship!";
            }
          } else {
            row[columnIndex] = "Hit"; // directly in the ship cell to change it
            return "You hit a ship!";
          }
        }
      }
    }
  }

  receiveAttack(y, x) {
    if (this.findShip(y, x) == `there is no ship at current coordinate`) {
      return "you missed!";
    }
    if (this.findShip(y, x) == `Area already chosen!`) {
      return "Area already chosen!";
    }
    if (this.findShip(y, x) == `invalid position`) {
      return "invalid position";
    } else {
      return this.hitIdShip(this.findShip(y, x));
    }
  }

  clearBoard() {
    this.board = this.createBoard(10, 10);
  }
}

// let gameBoard = new Gameboard();
// let ship = new Ship();
// console.log(gameBoard.board);
// gameBoard.receiveAttack("a", 1);
// console.log(typeof gameBoard.board[1][0] === "object");
// console.log(typeof gameBoard.board[1][1] === "object");

// console.log(gameBoard.board[3][4]);
module.exports = Gameboard;
