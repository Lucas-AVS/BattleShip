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

  placeShip(shipLength, coordinate) {
    let yAxis = coordinate[0];
    let xAxis = coordinate[1];
    let currentShip = new Ship(shipLength);

    // Checks if the ship fits in coordinates
    if (xAxis + shipLength > this.board[yAxis].length) {
      return "ship does not fit this coordinate";
    }

    // Check if there is already have a ship in coordinates
    for (let i = 0; i < shipLength; i++) {
      if (this.board[yAxis][xAxis + i].length !== 0) {
        return "there is already a ship in this area";
      }
    }

    // remove empty arrays by ship length and add current ship
    this.board[yAxis].splice(xAxis, shipLength, currentShip);
  }
}

let gameBoard = new Gameboard();
// gameBoard.placeShip(3, [3, 7]);

// console.log(gameBoard.board);

module.exports = gameBoard;
