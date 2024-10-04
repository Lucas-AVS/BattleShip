const Ship = require("./ship");

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
    let xAxis = coordinate[1];
    let currentShip = new Ship(shipLength);

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

      // 3
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
}

// let gameBoard = new Gameboard();
// console.log(gameBoard.board);
// gameBoard.placeShip(3, [3, 7], true);

// console.log(gameBoard.board);

module.exports = Gameboard;
