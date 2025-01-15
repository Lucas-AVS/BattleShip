const Gameboard = require("./gameBoard");

class Player {
  constructor(realPlayer) {
    realPlayer ? (this.playerType = "real") : (this.playerType = "computer");
    this.turn = true;
    this.gameBoard = new Gameboard();
  }
  play() {
    return (this.turn = false);
  }
}

module.exports = Player;
