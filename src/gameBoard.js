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
          row.push([]); // Inicializa cada quadrante do tabuleiro como um array vazio
        }
        board[j] = row; // Adiciona cada linha ao tabuleiro
      }
      return board;
    }
  }

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
    const yPositionToValue = y.charCodeAt(0) - 96; // 'a' -> índice 1, 'b' -> índice 2, etc.
    const xPosition = x - 1; // Ajustar para índice interno (0-based)

    if (
      !this.board[yPositionToValue] ||
      !this.board[yPositionToValue][xPosition] ||
      this.board[yPositionToValue][xPosition].length === 0
    ) {
      return `there is no ship at current coordinate`;
    } else {
      return `you found ship ${this.board[yPositionToValue][xPosition].id}`;
    }
  }
}

let gameBoard = new Gameboard();
// console.log(gameBoard.board);
// gameBoard.placeShip(3, [3, 5], true);
// gameBoard.placeShip(1, [1, 1]);
// gameBoard.placeShip(3, [6, 5], true);

// console.log(gameBoard.board);
// console.log(gameBoard.findShip("g", 3));
// console.log(gameBoard.findShip("c", 5));
// console.log(gameBoard.findShip("a", 1));

module.exports = Gameboard;
